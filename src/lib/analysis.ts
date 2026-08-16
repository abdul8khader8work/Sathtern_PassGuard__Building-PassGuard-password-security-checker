import zxcvbn from "zxcvbn";
import type { AnalysisResult, PasswordChecks, StrengthScore } from "./types";
import {
  SCORE_LABELS,
  CRACK_TIME_TEXT,
  FALLBACK_TOP_ISSUES,
  FALLBACK_TOP_SUGGESTIONS,
} from "./constants";

export function analyzePassword(password: string): AnalysisResult {
  if (!password) {
    return createEmptyResult();
  }

  const result = zxcvbn(password);
  const score = result.score as StrengthScore;

  const entropyBits = Math.round(result.guesses_log10 * Math.log2(10));

  const checks = computeChecks(password, result);

  const topIssue = getTopIssue(result, score);
  const topSuggestion = getTopSuggestion(result, score);

  return {
    score,
    label: SCORE_LABELS[score],
    entropyBits,
    crackTimeText: CRACK_TIME_TEXT[score],
    topIssue,
    topSuggestion,
    issues: result.feedback.warning ? [result.feedback.warning] : [],
    suggestions: result.feedback.suggestions,
    checks,
  };
}

function createEmptyResult(): AnalysisResult {
  return {
    score: 0,
    label: SCORE_LABELS[0],
    entropyBits: 0,
    crackTimeText: CRACK_TIME_TEXT[0],
    topIssue: FALLBACK_TOP_ISSUES[0],
    topSuggestion: FALLBACK_TOP_SUGGESTIONS[0],
    issues: [],
    suggestions: [],
    checks: {
      lengthAtLeast12: false,
      lengthAtLeast16: false,
      hasLowercase: false,
      hasUppercase: false,
      hasNumber: false,
      hasSymbol: false,
      isCommonPassword: false,
      hasRepeatedChars: false,
      hasSequence: false,
      containsDictionaryWord: false,
    },
  };
}

function computeChecks(password: string, result: zxcvbn.ZXCVBNResult): PasswordChecks {
  return {
    lengthAtLeast12: password.length >= 12,
    lengthAtLeast16: password.length >= 16,
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSymbol: /[^A-Za-z0-9]/.test(password),
    isCommonPassword: result.sequence.some(
      (match) =>
        match.pattern === "dictionary" &&
        "dictionaryName" in match &&
        match.dictionaryName === "passwords"
    ),
    containsDictionaryWord: result.sequence.some((match) => match.pattern === "dictionary"),
    hasRepeatedChars: result.sequence.some((match) => match.pattern === "repeat"),
    hasSequence: result.sequence.some(
      (match) => match.pattern === "sequence" || match.pattern === "spatial"
    ),
  };
}

function getTopIssue(result: zxcvbn.ZXCVBNResult, score: StrengthScore): string {
  if (result.feedback.warning) {
    return result.feedback.warning;
  }
  return FALLBACK_TOP_ISSUES[score];
}

function getTopSuggestion(result: zxcvbn.ZXCVBNResult, score: StrengthScore): string {
  if (result.feedback.suggestions.length > 0) {
    return result.feedback.suggestions[0];
  }
  return FALLBACK_TOP_SUGGESTIONS[score];
}