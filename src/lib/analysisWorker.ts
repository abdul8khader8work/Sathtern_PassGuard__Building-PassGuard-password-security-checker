export interface WorkerRequest {
  id: string;
  type: "analyze";
  password: string;
}

export interface WorkerSuccessResponse {
  id: string;
  type: "result";
  result: import("./types").AnalysisResult;
}

export interface WorkerErrorResponse {
  id: string;
  type: "error";
  message: string;
}

const workerCode = `
  importScripts('https://cdn.jsdelivr.net/npm/zxcvbn@4.4.2/dist/zxcvbn.js');

  self.onmessage = async (event) => {
    const { id, password } = event.data;

    try {
      const result = zxcvbn(password);
      const score = result.score;
      const entropyBits = Math.round(result.guesses_log10 * Math.log2(10));

      const SCORE_LABELS = ["Very Weak", "Weak", "Fair", "Strong", "Excellent"];
      const CRACK_TIME_TEXT = [
        "Very fast to guess in common offline attacks",
        "Likely cracked quickly with modern tools",
        "Could be cracked within minutes to hours",
        "Would take significant time to crack",
        "Impractical to guess with common offline attacks",
      ];
      const FALLBACK_TOP_ISSUES = [
        "It is too easy to guess.",
        "It contains predictable patterns or common words.",
        "It is somewhat predictable.",
        "It is reasonably strong but can be improved.",
        "None detected.",
      ];
      const FALLBACK_TOP_SUGGESTIONS = [
        "Use a longer passphrase of unrelated words.",
        "Increase length and avoid common words.",
        "Add more random unrelated words or characters.",
        "Increase length for even stronger protection.",
        "This is a great length!",
      ];

      const checks = {
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

      const topIssue = result.feedback.warning || FALLBACK_TOP_ISSUES[score];
      const topSuggestion = result.feedback.suggestions[0] || FALLBACK_TOP_SUGGESTIONS[score];

      const analysisResult = {
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

      self.postMessage({
        id,
        type: "result",
        result: analysisResult,
      });
    } catch {
      self.postMessage({
        id,
        type: "error",
        message: "Password analysis failed.",
      });
    }
  };
`;

export function createAnalysisWorker(): Worker | null {
  try {
    const blob = new Blob([workerCode], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    URL.revokeObjectURL(url);
    return worker;
  } catch {
    return null;
  }
}