import { ShieldCheck, ExternalLink } from "lucide-react";
import { GITHUB_URL } from "../lib/constants";
import { ICON_BUTTON_CLASS } from "../lib/constants";

export function Header() {
  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <ShieldCheck className="w-6 h-6 text-gray-900" aria-hidden="true" />
        <h1 className="text-xl font-bold text-gray-900">PassGuard</h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
          <ShieldCheck className="w-3 h-3" aria-hidden="true" />
          100% Local / Secure
        </span>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={ICON_BUTTON_CLASS}
          aria-label="View on GitHub"
        >
          <ExternalLink className="w-5 h-5" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}