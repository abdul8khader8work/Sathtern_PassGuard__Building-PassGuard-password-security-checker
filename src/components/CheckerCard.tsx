import { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import { StrengthMeter } from "./StrengthMeter";
import { ResultSummary } from "./ResultSummary";
import { DetailedBreakdown } from "./DetailedBreakdown";
import { CARD_CLASS } from "../lib/constants";
import type { AnalysisResult, BreachStatus } from "../lib/types";

interface CheckerCardProps {
  password: string;
  setPassword: (val: string) => void;
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
  onClear: () => void;
  result: AnalysisResult | null;
  breachStatus: BreachStatus;
}

export function CheckerCard({
  password,
  setPassword,
  isVisible,
  setIsVisible,
  onClear,
  result,
  breachStatus,
}: CheckerCardProps) {
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);

  const score = result?.score ?? null;
  const label = result?.label ?? "—";
  
  // Derive analysis state from result and breachStatus
  const analysisState = result ? "ready" : (password ? "analyzing" : "idle");

  return (
    <section className={CARD_CLASS} aria-labelledby="checker-heading">
      <h2 id="checker-heading" className="text-xl font-bold text-gray-900 mb-6">
        Password Strength Checker
      </h2>

      <PasswordInput
        password={password}
        setPassword={setPassword}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onClear={onClear}
      />

      <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
        <StrengthMeter score={score} label={label} />
        <ResultSummary result={result} analysisState={analysisState} />
        <DetailedBreakdown
          result={result}
          breach={{ status: breachStatus, message: getBreachMessage(breachStatus) }}
          passwordLength={password.length}
          isOpen={isBreakdownOpen}
          onToggle={() => setIsBreakdownOpen((prev) => !prev)}
        />
      </div>
    </section>
  );
}

function getBreachMessage(status: BreachStatus): string {
  switch (status) {
    case 'idle':
      return "Breach lookup will run after you type.";
    case 'checking':
      return "Checking hash prefix against breach database...";
    case 'safe':
      return "No match found in the checked breach dataset.";
    case 'breached':
      return "This password appears in known data breaches. Do not use it.";
    case 'error':
      return "Breach lookup unavailable. Try again later.";
    default:
      return "Breach lookup will run after you type.";
  }
}