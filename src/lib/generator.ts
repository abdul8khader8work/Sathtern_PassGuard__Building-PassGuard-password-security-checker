import type { RandomPasswordOptions } from "./types";
import { PASSPHRASE_WORDS } from "./wordlist";
import {
  RANDOM_PASSWORD_MIN_LENGTH,
  RANDOM_PASSWORD_MAX_LENGTH,
  RANDOM_PASSWORD_DEFAULT_LENGTH,
  PASSPHRASE_MIN_WORDS,
  PASSPHRASE_MAX_WORDS,
  PASSPHRASE_DEFAULT_WORDS,
  PASSPHRASE_SEPARATOR,
} from "./constants";

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>?";

function getRandomValues(array: Uint32Array): Uint32Array {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array as unknown as ArrayBufferView<ArrayBuffer>);
    return array;
  }
  // Fallback for non-secure contexts (less secure, but prevents app crash)
  for (let i = 0; i < array.length; i++) {
    array[i] = Math.floor(Math.random() * 4294967296);
  }
  return array;
}

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  const randomValues = new Uint32Array(result.length);
  getRandomValues(randomValues);
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomValues[i] % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function generateRandomPassword(options: RandomPasswordOptions): string {
  const length = Math.max(RANDOM_PASSWORD_MIN_LENGTH, Math.min(RANDOM_PASSWORD_MAX_LENGTH, options.length));

  let charset = LOWERCASE;
  const requiredChars: string[] = [];

  requiredChars.push(LOWERCASE[getRandomValues(new Uint32Array(1))[0] % LOWERCASE.length]);

  if (options.uppercase) {
    charset += UPPERCASE;
    requiredChars.push(UPPERCASE[getRandomValues(new Uint32Array(1))[0] % UPPERCASE.length]);
  }

  if (options.numbers) {
    charset += NUMBERS;
    requiredChars.push(NUMBERS[getRandomValues(new Uint32Array(1))[0] % NUMBERS.length]);
  }

  if (options.symbols) {
    charset += SYMBOLS;
    requiredChars.push(SYMBOLS[getRandomValues(new Uint32Array(1))[0] % SYMBOLS.length]);
  }

  const remainingLength = length - requiredChars.length;
  const randomValues = new Uint32Array(remainingLength);
  getRandomValues(randomValues);
  const randomChars = Array.from({ length: remainingLength }, (_, i) =>
    charset[randomValues[i] % charset.length]
  );

  const allChars = [...requiredChars, ...randomChars];
  return shuffleArray(allChars).join("");
}

export function generatePassphrase(wordCount: number): string {
  if (!PASSPHRASE_WORDS.length) {
    throw new Error("Wordlist unavailable");
  }

  const count = Math.max(PASSPHRASE_MIN_WORDS, Math.min(PASSPHRASE_MAX_WORDS, wordCount));

  if (PASSPHRASE_WORDS.length < 2048) {
    throw new Error("Wordlist must contain at least 2048 words");
  }

  const randomValues = new Uint32Array(count);
  getRandomValues(randomValues);
  const selectedWords = Array.from(randomValues).map((val) => PASSPHRASE_WORDS[val % PASSPHRASE_WORDS.length]);

  return selectedWords.join(PASSPHRASE_SEPARATOR);
}

export const DEFAULT_RANDOM_OPTIONS: RandomPasswordOptions = {
  length: RANDOM_PASSWORD_DEFAULT_LENGTH,
  uppercase: true,
  numbers: true,
  symbols: true,
};

export const DEFAULT_PASSPHRASE_WORD_COUNT = PASSPHRASE_DEFAULT_WORDS;