import type { AnalysisResult } from "../lib/types";

interface ResultSummaryProps {
  result: AnalysisResult | null;
  analysisState: "idle" | "typing" | "analyzing" | "ready" | "error";
}

export function ResultSummary({ result, analysisState }: ResultSummaryProps) {
  if (analysisState === "analyzing") {
    return (
      <div className="min-h-44 space-y-3" aria-live="polite" aria-atomic="true">
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Analyzing&hellip;</span>
        </div>
      </div>
    );
  }

  if (analysisState === "error") {
    return (
      <div className="min-h-44 space-y-3" aria-live="polite" aria-atomic="true">
        <p className="text-red-600">Analysis failed. Please try again.</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-44 space-y-3 text-gray-500" aria-live="polite" aria-atomic="true">
        <p>Strength: —</p>
        <p>Guess time: —</p>
        <p>Issue: Enter a password to see results.</p>
        <p>Tip: Use a longer passphrase of unrelated words.</p>
      </div>
    );
  }

  return (
    <div className="min-h-44 space-y-3" aria-live="polite" aria-atomic="true">
      <p className="text-lg font-medium text-gray-900">
        <span className="font-normal">Strength:</span> {result.label}
      </p>
      <p className="text-gray-600">
        <span className="font-medium text-gray-900">Guess time:</span> {result.crackTimeText}
      </p>
      <p className="text-gray-600">
        <span className="font-medium text-gray-900">Issue:</span> {result.topIssue}
      </p>
      <p className="text-gray-600">
        <span className="font-medium text-gray-900">Tip:</span> {result.topSuggestion}
      </p>
    </div>
  );
}