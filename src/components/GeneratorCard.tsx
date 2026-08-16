import { RefreshCw, Copy, AlertCircle } from "lucide-react";
import { useGenerator } from "../hooks/useGenerator";
import { useClipboard } from "../hooks/useClipboard";
import { GeneratorControls } from "./GeneratorControls";
import { GeneratedOutput } from "./GeneratedOutput";
import { CopyToast } from "./CopyToast";
import { CARD_CLASS, BUTTON_PRIMARY_CLASS, BUTTON_SECONDARY_CLASS, TRANSITION_CLASS } from "../lib/constants";

export function GeneratorCard() {
  const {
    mode,
    randomOptions,
    passphraseWordCount,
    generatedPassword,
    generate,
    error,
    handleModeChange,
    handleRandomOptionChange,
    handlePassphraseWordCountChange,
    handleLengthChange,
  } = useGenerator();

  const { copy, toast } = useClipboard();

  const handleGenerate = () => {
    generate();
  };

  const handleCopy = async () => {
    await copy(generatedPassword);
  };

  return (
    <section className={CARD_CLASS} aria-labelledby="generator-heading">
      <h2 id="generator-heading" className="text-xl font-bold text-gray-900 mb-6">
        Strong Password Generator
      </h2>

      <GeneratorControls
        mode={mode}
        randomOptions={randomOptions}
        passphraseWordCount={passphraseWordCount}
        onModeChange={handleModeChange}
        onRandomOptionChange={handleRandomOptionChange}
        onPassphraseWordCountChange={handlePassphraseWordCountChange}
        onLengthChange={handleLengthChange}
      />

      {error && (
        <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
          <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-6">
        <GeneratedOutput password={generatedPassword} />
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleGenerate}
          className={`${BUTTON_PRIMARY_CLASS} ${TRANSITION_CLASS} flex-1 py-3 flex items-center justify-center gap-2`}
          aria-label="Generate new password"
        >
          <RefreshCw className="w-5 h-5" aria-hidden="true" />
          <span>Generate</span>
        </button>
        <button
          onClick={handleCopy}
          disabled={!generatedPassword}
          className={`${BUTTON_SECONDARY_CLASS} ${TRANSITION_CLASS} flex-1 py-3 flex items-center justify-center gap-2`}
          aria-label="Copy password to clipboard"
        >
          <Copy className="w-5 h-5" aria-hidden="true" />
          <span>Copy</span>
        </button>
      </div>

      <CopyToast toast={toast} />
    </section>
  );
}