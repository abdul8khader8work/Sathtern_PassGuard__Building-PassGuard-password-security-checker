import { useState, useCallback, useEffect, useRef } from "react";
import type { AnalysisResult, BreachResult } from "../lib/types";
import { analyzePassword } from "../lib/analysis";
import { checkBreach } from "../lib/breach";
import { createAnalysisWorker } from "../lib/analysisWorker";
import { debounce } from "../lib/utils";
import {
  MAX_PASSWORD_LENGTH,
  ANALYSIS_DEBOUNCE_MS,
  BREACH_DEBOUNCE_MS,
  EXAMPLE_PASSWORDS,
} from "../lib/constants";

export function usePasswordAnalysis() {
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [analysisState, setAnalysisState] = useState<"idle" | "typing" | "analyzing" | "ready" | "error">("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [breach, setBreach] = useState<BreachResult>({ status: "idle", message: "Breach lookup will run after you type." });

  const workerRef = useRef<Worker | null>(null);
  const requestIdRef = useRef(0);
  const breachTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    workerRef.current = createAnalysisWorker();
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
      if (breachTimeoutRef.current) {
        clearTimeout(breachTimeoutRef.current);
      }
    };
  }, []);

  const runAnalysis = useCallback(
    (pwd: string) => {
      const currentId = ++requestIdRef.current;

      if (!pwd) {
        setResult(null);
        setAnalysisState("idle");
        setBreach({ status: "idle", message: "Breach lookup will run after you type." });
        return;
      }

      setAnalysisState("analyzing");

      const worker = workerRef.current;
      if (worker) {
        worker.postMessage({ id: currentId, type: "analyze", password: pwd });
      } else {
        try {
          const analysisResult = analyzePassword(pwd);
          if (currentId === requestIdRef.current) {
            setResult(analysisResult);
            setAnalysisState("ready");
          }
        } catch {
          if (currentId === requestIdRef.current) {
            setAnalysisState("error");
            setResult(null);
          }
        }
      }
    },
    []
  );

  const debouncedAnalysis = useRef(
    debounce((pwd: string) => {
      runAnalysis(pwd);
    }, ANALYSIS_DEBOUNCE_MS)
  ).current;

  const handleWorkerMessage = useCallback(
    (event: MessageEvent) => {
      const { id, type, result: workerResult } = event.data;

      if (id !== requestIdRef.current) return;

      if (type === "result") {
        setResult(workerResult);
        setAnalysisState("ready");
      } else if (type === "error") {
        setAnalysisState("error");
        setResult(null);
      }
    },
    []
  );

  useEffect(() => {
    const worker = workerRef.current;
    if (worker) {
      worker.onmessage = handleWorkerMessage;
      return () => {
        worker.onmessage = null;
      };
    }
  }, [handleWorkerMessage]);

  const scheduleBreachCheck = useCallback(
    debounce(async (pwd: string) => {
      if (!pwd) {
        setBreach({ status: "idle", message: "Breach lookup will run after you type." });
        return;
      }

      setBreach({ status: "checking", message: "Checking hash prefix against breach database..." });

      try {
        const breachResult = await checkBreach(pwd);
        setBreach(breachResult);
      } catch {
        setBreach({ status: "error", message: "Breach lookup unavailable. Try again later." });
      }
    }, BREACH_DEBOUNCE_MS),
    []
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.slice(0, MAX_PASSWORD_LENGTH);
      setPassword(value);
      setAnalysisState("typing");
      debouncedAnalysis(value);
      scheduleBreachCheck(value);
    },
    [debouncedAnalysis, scheduleBreachCheck]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      const pastedText = e.clipboardData.getData("text").slice(0, MAX_PASSWORD_LENGTH);
      setPassword(pastedText);
      setAnalysisState("typing");
      debouncedAnalysis(pastedText);
      scheduleBreachCheck(pastedText);
    },
    [debouncedAnalysis, scheduleBreachCheck]
  );

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const clearPassword = useCallback(() => {
    setPassword("");
    setResult(null);
    setBreach({ status: "idle", message: "Breach lookup will run after you type." });
    setAnalysisState("idle");
    requestIdRef.current++;
    if (breachTimeoutRef.current) {
      clearTimeout(breachTimeoutRef.current);
      breachTimeoutRef.current = null;
    }
  }, []);

  const exampleIndexRef = useRef(0);
  const tryExample = useCallback(() => {
    const example = EXAMPLE_PASSWORDS[exampleIndexRef.current % EXAMPLE_PASSWORDS.length];
    exampleIndexRef.current++;
    setPassword(example);
    setAnalysisState("typing");
    debouncedAnalysis(example);
    scheduleBreachCheck(example);
  }, [debouncedAnalysis, scheduleBreachCheck]);

  return {
    password,
    setPassword,
    isVisible,
    setIsVisible,
    analysisState,
    result,
    breach,
    handleChange,
    handlePaste,
    toggleVisibility,
    clearPassword,
    tryExample,
  };
}