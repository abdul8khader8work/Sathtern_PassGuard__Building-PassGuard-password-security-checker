import { useState, useCallback, useEffect } from "react";
import type { RandomPasswordOptions, GeneratorMode } from "../lib/types";
import {
  generateRandomPassword,
  generatePassphrase,
  DEFAULT_RANDOM_OPTIONS,
  DEFAULT_PASSPHRASE_WORD_COUNT,
} from "../lib/generator";
import {
  RANDOM_PASSWORD_MIN_LENGTH,
  RANDOM_PASSWORD_MAX_LENGTH,
  PASSPHRASE_MIN_WORDS,
  PASSPHRASE_MAX_WORDS,
} from "../lib/constants";

export function useGenerator() {
  const [mode, setMode] = useState<GeneratorMode>("random");
  const [randomOptions, setRandomOptions] = useState<RandomPasswordOptions>(DEFAULT_RANDOM_OPTIONS);
  const [passphraseWordCount, setPassphraseWordCount] = useState(DEFAULT_PASSPHRASE_WORD_COUNT);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(() => {
    try {
      if (mode === "random") {
        setGeneratedPassword(generateRandomPassword(randomOptions));
      } else {
        setGeneratedPassword(generatePassphrase(passphraseWordCount));
      }
      setError(null);
    } catch {
      setGeneratedPassword("");
      setError("Generation failed");
    }
  }, [mode, randomOptions, passphraseWordCount]);

  useEffect(() => {
    generate();
  }, [generate]);

  const handleModeChange = useCallback((newMode: GeneratorMode) => {
    setMode(newMode);
  }, []);

  const handleRandomOptionChange = useCallback(<K extends keyof RandomPasswordOptions>(
    key: K,
    value: RandomPasswordOptions[K]
  ) => {
    setRandomOptions((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handlePassphraseWordCountChange = useCallback((count: number) => {
    setPassphraseWordCount(Math.max(PASSPHRASE_MIN_WORDS, Math.min(PASSPHRASE_MAX_WORDS, count)));
  }, []);

  const handleLengthChange = useCallback((length: number) => {
    handleRandomOptionChange("length", Math.max(RANDOM_PASSWORD_MIN_LENGTH, Math.min(RANDOM_PASSWORD_MAX_LENGTH, length)));
  }, [handleRandomOptionChange]);

  return {
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
  };
}