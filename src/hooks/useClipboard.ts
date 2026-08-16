import { useState, useCallback } from "react";
import { copyToClipboard } from "../lib/clipboard";

export function useClipboard() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const copy = useCallback(async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setToast({ message: "Copied", type: "success" });
    } else {
      setToast({ message: "Copy failed", type: "error" });
    }
    setTimeout(() => setToast(null), 2000);
    return success;
  }, []);

  return { copy, toast };
}