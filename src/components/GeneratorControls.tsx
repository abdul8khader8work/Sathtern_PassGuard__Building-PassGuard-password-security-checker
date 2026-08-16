import type { RandomPasswordOptions } from "../lib/types";
import {
  RANDOM_PASSWORD_MIN_LENGTH,
  RANDOM_PASSWORD_MAX_LENGTH,
  PASSPHRASE_MIN_WORDS,
  PASSPHRASE_MAX_WORDS,
} from "../lib/constants";
import { LABEL_CLASS, TRANSITION_CLASS } from "../lib/constants";
import { Switch } from "./ui/Switch";

interface GeneratorControlsProps {
  mode: "random" | "passphrase";
  randomOptions: RandomPasswordOptions;
  passphraseWordCount: number;
  onModeChange: (mode: "random" | "passphrase") => void;
  onRandomOptionChange: <K extends keyof RandomPasswordOptions>(key: K, value: RandomPasswordOptions[K]) => void;
  onPassphraseWordCountChange: (count: number) => void;
  onLengthChange: (length: number) => void;
}

function SwitchOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-gray-50 cursor-pointer">
      <span className="text-gray-900">{label}</span>
      <Switch.Root
        checked={checked}
        onCheckedChange={onChange}
        aria-label={label}
      >
        <Switch.Thumb />
      </Switch.Root>
    </label>
  );
}

export function GeneratorControls({
  mode,
  randomOptions,
  passphraseWordCount,
  onModeChange,
  onRandomOptionChange,
  onPassphraseWordCountChange,
  onLengthChange,
}: GeneratorControlsProps) {
  return (
    <div className="space-y-6">
      <div className="flex gap-2" role="radiogroup" aria-label="Generator mode">
        <button
          role="radio"
          aria-checked={mode === "random"}
          onClick={() => onModeChange("random")}
          className={`flex-1 px-4 py-3 rounded-lg border font-medium text-sm transition-colors ${TRANSITION_CLASS} ${
            mode === "random"
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
          }`}
        >
          Random
        </button>
        <button
          role="radio"
          aria-checked={mode === "passphrase"}
          onClick={() => onModeChange("passphrase")}
          className={`flex-1 px-4 py-3 rounded-lg border font-medium text-sm transition-colors ${TRANSITION_CLASS} ${
            mode === "passphrase"
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
          }`}
        >
          Passphrase
        </button>
      </div>

      {mode === "random" && (
        <div className="space-y-4">
          <div>
            <label htmlFor="random-length" className={LABEL_CLASS}>
              Length: {randomOptions.length}
            </label>
            <input
              id="random-length"
              type="range"
              min={RANDOM_PASSWORD_MIN_LENGTH}
              max={RANDOM_PASSWORD_MAX_LENGTH}
              value={randomOptions.length}
              onChange={(e) => onLengthChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
              aria-valuemin={RANDOM_PASSWORD_MIN_LENGTH}
              aria-valuemax={RANDOM_PASSWORD_MAX_LENGTH}
              aria-valuenow={randomOptions.length}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SwitchOption
              label="Uppercase"
              checked={randomOptions.uppercase}
              onChange={(checked) => onRandomOptionChange("uppercase", checked)}
            />
            <SwitchOption
              label="Numbers"
              checked={randomOptions.numbers}
              onChange={(checked) => onRandomOptionChange("numbers", checked)}
            />
            <SwitchOption
              label="Symbols"
              checked={randomOptions.symbols}
              onChange={(checked) => onRandomOptionChange("symbols", checked)}
            />
          </div>
        </div>
      )}

      {mode === "passphrase" && (
        <div>
          <label htmlFor="passphrase-words" className={LABEL_CLASS}>
            Word count: {passphraseWordCount}
          </label>
          <input
            id="passphrase-words"
            type="range"
            min={PASSPHRASE_MIN_WORDS}
            max={PASSPHRASE_MAX_WORDS}
            value={passphraseWordCount}
            onChange={(e) => onPassphraseWordCountChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
            aria-valuemin={PASSPHRASE_MIN_WORDS}
            aria-valuemax={PASSPHRASE_MAX_WORDS}
            aria-valuenow={passphraseWordCount}
          />
          <p className="text-sm text-gray-500 mt-1">
            Words are joined with hyphens (e.g., correct-horse-battery-staple)
          </p>
        </div>
      )}
    </div>
  );
}