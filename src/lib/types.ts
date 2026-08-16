export type StrengthScore = 0 | 1 | 2 | 3 | 4;

export type BreachStatus =
  | "idle"
  | "checking"
  | "safe"
  | "breached"
  | "error";

export interface PasswordChecks {
  // Original blueprint required keys:
  length: boolean;           // true if length >= 12
  commonPassword: boolean;   // true if in common passwords list
  repeatedChars: boolean;    // true if has repeated chars
  sequence: boolean;         // true if has sequence/spatial pattern
  dictionaryWord: boolean;   // true if contains dictionary word
  breached: boolean;         // true if found in HIBP (updated by hook)

  // Keep your detailed keys for the UI checklist:
  lengthAtLeast12: boolean;
  lengthAtLeast16: boolean;
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  isCommonPassword: boolean;
  hasRepeatedChars: boolean;
  hasSequence: boolean;
  containsDictionaryWord: boolean;
}

export interface AnalysisResult {
  score: StrengthScore;
  label: string;
  entropyBits: number;
  crackTimeText: string;
  topIssue: string;
  topSuggestion: string;
  issues: string[];
  suggestions: string[];
  checks: PasswordChecks;
}

export interface WorkerRequest {
  id: string;
  type: "analyze";
  password: string;
}

export interface WorkerSuccessResponse {
  id: string;
  type: "result";
  result: AnalysisResult;
}

export interface WorkerErrorResponse {
  id: string;
  type: "error";
  message: string;
}

export interface BreachResult {
  status: BreachStatus;
  message: string;
}

export interface RandomPasswordOptions {
  length: number;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export type GeneratorMode = "random" | "passphrase";