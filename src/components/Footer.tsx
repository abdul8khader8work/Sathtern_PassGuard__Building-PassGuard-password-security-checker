import { ExternalLink } from "lucide-react";
import { GITHUB_URL, APP_NAME } from "../lib/constants";

export function Footer() {
  return (
    <footer className="py-8 px-4 md:px-0 text-center text-sm text-gray-500">
      <p className="mb-2">
        {APP_NAME} &mdash; Zero Data Collection &mdash; Open Source
      </p>
      <div className="flex items-center justify-center gap-4">
        <a
          href="#privacy"
          className="text-gray-500 hover:text-gray-900 underline underline-offset-2 transition-colors"
        >
          Privacy
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
          Open Source
        </a>
      </div>
    </footer>
  );
}