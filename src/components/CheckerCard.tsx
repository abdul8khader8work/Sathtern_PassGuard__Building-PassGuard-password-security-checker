import { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import { StrengthMeter } from "./StrengthMeter";
import { ResultSummary } from "./ResultSummary";
import { DetailedBreakdown } from "./DetailedBreakdown";
import { CARD_CLASS } from "../lib/constants";
import type { AnalysisResult } from "../lib/types";

interface CheckerCardProps {
  password: string;
  setPassword: (val: string) => void;
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
  onClear: () => void;
  result: AnalysisResult | null;
  analysisState: "idle" | "typing" | "analyzing" | "ready" | "error";
  breach: { status: "idle" | "checking" | "safe" | "breached" | "error"; message: string };
  tryExample: () => void;
  handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

export function CheckerCard({
  password,
  setPassword,
  isVisible,
  setIsVisible,
  onClear,
  result,
  analysisState,
  breach,
  tryExample,
  handlePaste,
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
        setPassword={setPassword}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onClear={onClear}
        onTryExample={tryExample}
        onPaste={handlePaste}
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