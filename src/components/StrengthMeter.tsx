import { SEGMENT_CLASSES, EMPTY_SEGMENT_CLASS, BADGE_CLASSES, TRANSITION_CLASS } from "../lib/constants";
import type { StrengthScore } from "../lib/types";

interface StrengthMeterProps {
  score: StrengthScore | null;
  label: string;
}

export function StrengthMeter({ score, label }: StrengthMeterProps) {
  const filledCount = score !== null ? score + 1 : 0;

  return (
    <div className="space-y-3">
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={4}
        aria-valuenow={score !== null ? score : 0}
        aria-valuetext={score !== null ? `${label}, ${score} out of 4` : "No password entered"}
        className="flex gap-1.5"
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`h-3 flex-1 rounded-sm border transition-all duration-300 motion-reduce:transition-none ${
              index < filledCount
                ? `${SEGMENT_CLASSES[index as StrengthScore]} ${TRANSITION_CLASS}`
                : EMPTY_SEGMENT_CLASS
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="flex items-center gap-3">
        {score !== null && (
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${BADGE_CLASSES[score]} ${TRANSITION_CLASS}`}
          >
            {label}
          </span>
        )}
        {score === null && (
          <span className="text-sm text-gray-500">Strength: —</span>
        )}
      </div>
    </div>
  );
}