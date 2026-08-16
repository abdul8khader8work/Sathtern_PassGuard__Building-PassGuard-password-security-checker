import { ChevronDown, CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";
import type { AnalysisResult, BreachResult } from "../lib/types";
import { CARD_CLASS, TRANSITION_CLASS } from "../lib/constants";

interface DetailedBreakdownProps {
  result: AnalysisResult | null;
  breach: BreachResult;
  passwordLength: number;
  isOpen: boolean;
  onToggle: () => void;
}

interface CheckItem {
  key: keyof AnalysisResult["checks"];
  label: string;
  invert?: boolean;
}

const checkItems: CheckItem[] = [
  { key: "lengthAtLeast12", label: "At least 12 characters" },
  { key: "lengthAtLeast16", label: "At least 16 characters" },
  { key: "hasLowercase", label: "Contains lowercase letter" },
  { key: "hasUppercase", label: "Contains uppercase letter" },
  { key: "hasNumber", label: "Contains number" },
  { key: "hasSymbol", label: "Contains symbol" },
  { key: "isCommonPassword", label: "Not a common password", invert: true },
  { key: "containsDictionaryWord", label: "No dictionary words", invert: true },
  { key: "hasRepeatedChars", label: "No repeated characters", invert: true },
  { key: "hasSequence", label: "No sequential patterns", invert: true },
];

function CheckRow({ label, passed, invert = false }: { label: string; passed: boolean; invert?: boolean }) {
  const isGood = invert ? !passed : passed;
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-700">{label}</span>
      <span className="flex items-center gap-1.5">
        {isGood ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600" aria-hidden="true" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600" aria-hidden="true" />
        )}
        <span className={`text-sm font-medium ${isGood ? "text-emerald-600" : "text-red-600"}`}>
          {isGood ? "Yes" : "No"}
        </span>
      </span>
    </div>
  );
}

function BreachStatusBadge({ status, message }: BreachResult) {
  const statusConfig = {
    idle: { icon: Info, color: "text-gray-500", bg: "bg-gray-100", label: "Not checked" },
    checking: { icon: Info, color: "text-blue-700", bg: "bg-blue-100", label: "Checking&hellip;" },
    safe: { icon: CheckCircle2, color: "text-emerald-700", bg: "bg-emerald-100", label: "Safe" },
    breached: { icon: AlertCircle, color: "text-red-700", bg: "bg-red-100", label: "Breached" },
    error: { icon: AlertCircle, color: "text-amber-700", bg: "bg-amber-100", label: "Error" },
  } as const;

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-3 p-4 rounded-lg border" style={{ borderColor: config.bg.replace("bg-", ""), backgroundColor: config.bg.replace("bg-", "") }}>
      <Icon className={`w-5 h-5 ${config.color}`} aria-hidden="true" />
      <div>
        <p className={`font-medium ${config.color}`}>{config.label}</p>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export function DetailedBreakdown({ result, breach, passwordLength, isOpen, onToggle }: DetailedBreakdownProps) {
  return (
    <details className={CARD_CLASS}>
      <summary
        onClick={onToggle}
        className="flex items-center justify-between cursor-pointer list-none"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-900">View Detailed Analysis & Breach Check</span>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${TRANSITION_CLASS} ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
      </summary>

      <div className={`mt-6 space-y-6 ${isOpen ? "animate-in fade-in" : ""} motion-reduce:transition-none max-h-72 overflow-y-auto`}>
        <dl className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-gray-500">Characters</dt>
              <dd className="font-mono text-lg font-medium text-gray-900">{passwordLength}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Entropy estimate</dt>
              <dd className="font-mono text-lg font-medium text-gray-900">
                {result ? `${result.entropyBits} bits` : "—"}
              </dd>
            </div>
          </div>
        </dl>

        <div>
          <h3 className="font-medium text-gray-900 mb-3">Characteristics</h3>
          {result ? (
            <div className="space-y-0">
              {checkItems.map(({ key, label, invert }) => (
                <CheckRow
                  key={key}
                  label={label}
                  passed={result.checks[key]}
                  invert={invert}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Enter a password to see details.</p>
          )}
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-gray-400" aria-hidden="true" />
            Breach Check
          </h3>
          <BreachStatusBadge status={breach.status} message={breach.message} />
          <p className="mt-3 text-sm text-gray-500">
            Breach lookup sends only the first 5 characters of a SHA-1 hash.
          </p>
        </div>
      </div>
    </details>
  );
}