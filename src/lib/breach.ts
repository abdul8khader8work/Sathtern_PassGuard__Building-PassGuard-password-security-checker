import type { BreachResult } from "./types";
import { BREACH_MESSAGES, HIBP_RANGE_URL, BREACH_FETCH_TIMEOUT_MS } from "./constants";

export async function checkBreach(password: string): Promise<BreachResult> {
  if (!password) {
    return { status: "idle", message: BREACH_MESSAGES.idle };
  }

  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();

    const prefix = hashHex.substring(0, 5);
    const suffix = hashHex.substring(5);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), BREACH_FETCH_TIMEOUT_MS);

    const response = await fetch(`${HIBP_RANGE_URL}${prefix}`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const text = await response.text();
    const lines = text.split("\n");

    for (const line of lines) {
      const [hashSuffix] = line.split(":");
      if (hashSuffix === suffix) {
        return {
          status: "breached",
          message: BREACH_MESSAGES.breached,
        };
      }
    }

    return {
      status: "safe",
      message: BREACH_MESSAGES.safe,
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return {
        status: "error",
        message: BREACH_MESSAGES.error,
      };
    }
    if (!navigator.onLine) {
      return {
        status: "error",
        message: "Breach lookup unavailable offline.",
      };
    }
    return {
      status: "error",
      message: BREACH_MESSAGES.error,
    };
  }
}