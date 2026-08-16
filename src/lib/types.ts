export type StrengthScore = 0 | 1 | 2 | 3 | 4;

export type BreachStatus =
  | "idle"
  | "checking"
  | "safe"
  | "breached"
  | "error";

export interface PasswordChecks {
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