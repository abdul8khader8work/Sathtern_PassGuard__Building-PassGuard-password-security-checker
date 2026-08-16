export const APP_NAME = "PassGuard";

export const MAX_PASSWORD_LENGTH = 256;

export const ANALYSIS_DEBOUNCE_MS = 200;
export const BREACH_DEBOUNCE_MS = 700;
export const BREACH_FETCH_TIMEOUT_MS = 5000;

export const HIBP_RANGE_URL = "https://api.pwnedpasswords.com/range/";

export const EXAMPLE_PASSWORDS = [
  "password123",
  "Blue-Tiger-Sunset-42",
  "correct-horse-battery-staple",
] as const;

export const RANDOM_PASSWORD_MIN_LENGTH = 12;
export const RANDOM_PASSWORD_MAX_LENGTH = 32;
export const RANDOM_PASSWORD_DEFAULT_LENGTH = 16;

export const PASSPHRASE_MIN_WORDS = 3;
export const PASSPHRASE_MAX_WORDS = 6;
export const PASSPHRASE_DEFAULT_WORDS = 5;

export const PASSPHRASE_SEPARATOR = "-";

export const GITHUB_URL = "https://github.com/abdul8khader8work/Sathtern_PassGuard__Building-PassGuard-password-security-checker";

export const SCORE_LABELS = [
  "Very Weak",
  "Weak",
  "Fair",
  "Strong",
  "Excellent",
] as const;

export const CRACK_TIME_TEXT = [
  "Very fast to guess in common offline attacks",
  "Likely cracked quickly with modern tools",
  "Could be cracked within minutes to hours",
  "Would take significant time to crack",
  "Impractical to guess with common offline attacks",
] as const;

export const FALLBACK_TOP_ISSUES = [
  "It is too easy to guess.",
  "It contains predictable patterns or common words.",
  "It is somewhat predictable.",
  "It is reasonably strong but can be improved.",
  "None detected.",
] as const;

export const FALLBACK_TOP_SUGGESTIONS = [
  "Use a longer passphrase of unrelated words.",
  "Increase length and avoid common words.",
  "Add more random unrelated words or characters.",
  "Increase length for even stronger protection.",
  "This is a great length!",
] as const;

export const SEGMENT_CLASSES = [
  "bg-red-600",
  "bg-orange-500",
  "bg-amber-600",
  "bg-emerald-600",
  "bg-teal-800",
] as const;

export const BADGE_CLASSES = [
  "bg-red-600 text-white",
  "bg-orange-500 text-white",
  "bg-amber-100 text-amber-900 border border-amber-300",
  "bg-emerald-600 text-white",
  "bg-teal-800 text-white",
] as const;

export const EMPTY_SEGMENT_CLASS = "bg-gray-200 border border-gray-300";

export const BREACH_MESSAGES = {
  idle: "Breach lookup will run after you type.",
  checking: "Checking hash prefix against breach database...",
  safe: "No match found in the checked breach dataset.",
  breached: "This password appears in known data breaches. Do not use it.",
  error: "Breach lookup unavailable. Try again later.",
} as const;

export const CARD_CLASS = "rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8";

export const BUTTON_PRIMARY_CLASS = "bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2";
export const BUTTON_SECONDARY_CLASS = "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2";
export const ICON_BUTTON_CLASS = "p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2";

export const INPUT_CLASS = "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:bg-gray-50 disabled:text-gray-500";

export const LABEL_CLASS = "block text-sm font-medium text-gray-900 mb-2";
export const HELPER_TEXT_CLASS = "text-sm text-gray-500 mt-1";

export const TRANSITION_CLASS = "transition-colors duration-200 motion-reduce:transition-none";