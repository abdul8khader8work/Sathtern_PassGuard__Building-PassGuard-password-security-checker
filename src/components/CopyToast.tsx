import { CheckCircle, XCircle } from "lucide-react";

interface CopyToastProps {
  toast: { message: string; type: "success" | "error" } | null;
}

export function CopyToast({ toast }: CopyToastProps) {
  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-opacity duration-300 ${
        toast.type === "success"
          ? "bg-emerald-600 text-white"
          : "bg-red-600 text-white"
      }`}
    >
      <div className="flex items-center gap-2">
        {toast.type === "success" ? (
          <CheckCircle className="w-5 h-5" aria-hidden="true" />
        ) : (
          <XCircle className="w-5 h-5" aria-hidden="true" />
        )}
        {toast.message}
      </div>
    </div>
  );
}