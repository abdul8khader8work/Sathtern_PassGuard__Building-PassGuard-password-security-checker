import { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import { StrengthMeter } from "./StrengthMeter";
import { ResultSummary } from "./ResultSummary";
import { DetailedBreakdown } from "./DetailedBreakdown";
import { CARD_CLASS } from "../lib/constants";
import type { AnalysisResult, BreachResult } from "../lib/types";

interface CheckerCardProps {
  password: string;
  isVisible: boolean;
  analysisState: "idle" | "typing" | "analyzing" | "ready" | "error";
  result: AnalysisResult | null;
  breach: BreachResult;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  toggleVisibility: () => void;
  clearPassword: () => void;
  tryExample: () => void;
}

export function CheckerCard({
  password,
  isVisible,
  analysisState,
  result,
  breach,
  onChange,
  onPaste,
  toggleVisibility,
  clearPassword,
  tryExample,
}: CheckerCardProps) {
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);

  const score = result?.score ?? null;
  const label = result?.label ?? "—";

  return (
    <section className={CARD_CLASS} aria-labelledby="checker-heading">
      <h2 id="checker-heading" className="text-xl font-bold text-gray-900 mb-6">
        Password Strength Checker
      </h2>

      <PasswordInput
        password={password}
        isVisible={isVisible}
        onChange={onChange}
        onPaste={onPaste}
        toggleVisibility={toggleVisibility}
        clearPassword={clearPassword}
        tryExample={tryExample}
        disabled={analysisState === "analyzing"}
      />

      <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
        <StrengthMeter score={score} label={label} />
        <ResultSummary result={result} analysisState={analysisState} />
        <DetailedBreakdown
          result={result}
          breach={breach}
          passwordLength={password.length}
          isOpen={isBreakdownOpen}
          onToggle={() => setIsBreakdownOpen((prev) => !prev)}
        />
      </div>
    </section>
  );
}