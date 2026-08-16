import { BookOpen, ExternalLink } from "lucide-react";
import { useState } from "react";
import { GITHUB_URL, APP_NAME } from "../lib/constants";
import { BUTTON_SECONDARY_CLASS, TRANSITION_CLASS } from "../lib/constants";
import { LearnFAQDialog } from "./LearnFAQDialog";

export function BottomBar() {
  const [showLearnDialog, setShowLearnDialog] = useState(false);

  return (
    <footer className="border-t border-gray-200 bg-white py-3 px-4">
      <div className="mx-auto max-w-6xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLearnDialog(true)}
            className={`${BUTTON_SECONDARY_CLASS} ${TRANSITION_CLASS} text-sm px-3 py-2 flex items-center gap-2`}
            aria-label="Open Learn & FAQ"
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>Learn & FAQ</span>
          </button>
          <a
            href="#privacy"
            className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-2 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("privacy");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                el.focus();
              }
            }}
          >
            Privacy
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            <span>GitHub</span>
          </a>
        </div>
        <p className="text-xs text-gray-400">
          {APP_NAME} &mdash; Zero Data Collection &mdash; Open Source
        </p>
      </div>

      <LearnFAQDialog open={showLearnDialog} onClose={() => setShowLearnDialog(false)} />
    </footer>
  );
}