import { useState, useEffect, useRef, useCallback } from 'react';
import { analyzePassword } from '../lib/analysis';
import { checkBreach } from '../lib/breach';
import { EXAMPLE_PASSWORDS, ANALYSIS_DEBOUNCE_MS, BREACH_DEBOUNCE_MS, MAX_PASSWORD_LENGTH } from '../lib/constants';
import type { AnalysisResult, BreachResult } from '../lib/types';

export type AnalysisState = 'idle' | 'typing' | 'analyzing' | 'ready' | 'error';

export function usePasswordAnalysis() {
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
  const [breach, setBreach] = useState<BreachResult>({
    status: 'idle',
    message: 'Breach lookup will run after you type.',
  });

  const workerRef = useRef<Worker | null>(null);
  const analysisTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const breachTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const breachRequestIdRef = useRef(0);
  const exampleIndexRef = useRef(0);

  // Worker init (Vite syntax) with main-thread fallback
  useEffect(() => {
    try {
      workerRef.current = new Worker(
        new URL('../lib/analysisWorker.ts', import.meta.url),
        { type: 'module' }
      );
      workerRef.current.onmessage = (e: MessageEvent) => {
        if (e.data?.type === 'result') {
          setResult(e.data.result);
          setAnalysisState('ready');
        } else if (e.data?.type === 'error') {
          setAnalysisState('error');
        }
      };
      workerRef.current.onerror = (err) => {
        console.error('Worker error, falling back to main thread:', err);
        workerRef.current = null;
      };
    } catch (err) {
      console.warn('Worker init failed, using main thread:', err);
      workerRef.current = null;
    }
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  // Debounced analysis + debounced breach check
  useEffect(() => {
    if (analysisTimeoutRef.current) clearTimeout(analysisTimeoutRef.current);
    if (breachTimeoutRef.current) clearTimeout(breachTimeoutRef.current);

    if (!password) {
      setResult(null);
      setAnalysisState('idle');
      setBreach({ status: 'idle', message: 'Breach lookup will run after you type.' });
      return;
    }

    setAnalysisState('typing');

    analysisTimeoutRef.current = setTimeout(() => {
      setAnalysisState('analyzing');
      if (workerRef.current) {
        workerRef.current.postMessage({ type: 'analyze', password });
      } else {
        try {
          setResult(analyzePassword(password));
          setAnalysisState('ready');
        } catch (err) {
          console.error('Main thread analysis failed:', err);
          setAnalysisState('error');
        }
      }
    }, ANALYSIS_DEBOUNCE_MS);

    breachTimeoutRef.current = setTimeout(async () => {
      const requestId = ++breachRequestIdRef.current;
      setBreach({ status: 'checking', message: 'Checking hash prefix against breach database...' });
      try {
        const res = await checkBreach(password);
        if (breachRequestIdRef.current !== requestId) return;
        setBreach(res);
      } catch {
        if (breachRequestIdRef.current !== requestId) return;
        setBreach({ status: 'error', message: 'Breach lookup unavailable. Try again later.' });
      }
    }, BREACH_DEBOUNCE_MS);

    return () => {
      if (analysisTimeoutRef.current) clearTimeout(analysisTimeoutRef.current);
      if (breachTimeoutRef.current) clearTimeout(breachTimeoutRef.current);
    };
  }, [password]);

  const onClear = useCallback(() => {
    setPassword('');
    setResult(null);
    setAnalysisState('idle');
    setBreach({ status: 'idle', message: 'Breach lookup will run after you type.' });
  }, []);

  const tryExample = useCallback(() => {
    const next = EXAMPLE_PASSWORDS[exampleIndexRef.current % EXAMPLE_PASSWORDS.length];
    exampleIndexRef.current += 1;
    setPassword(next);
  }, []);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text');
    if (pasted) {
      e.preventDefault();
      setPassword(pasted.slice(0, MAX_PASSWORD_LENGTH));
    }
  }, []);

  return {
    password,
    setPassword,
    isVisible,
    setIsVisible,
    result,
    analysisState,
    breach,
    onClear,
    tryExample,
    handlePaste,
  };
}