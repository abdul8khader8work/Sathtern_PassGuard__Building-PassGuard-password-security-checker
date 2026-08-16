import { Shield, Link2, Key, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { CARD_CLASS, TRANSITION_CLASS } from "../lib/constants";

interface LearnFAQDialogProps {
  open: boolean;
  onClose: () => void;
}

const educationCards = [
  {
    icon: Shield,
    title: "Why length beats complexity",
    body: "A longer passphrase is often harder to crack than a short password with symbols.",
  },
  {
    icon: Link2,
    title: "Why reuse is dangerous",
    body: "If one site leaks your password, attackers will try it everywhere else.",
  },
  {
    icon: Key,
    title: "Why use a password manager",
    body: "A password manager creates and remembers unique strong passwords for every account.",
  },
];

const faqItems = [
  {
    question: "How does this work?",
    answer: "It analyzes your password locally using pattern matching and entropy estimates.",
  },
  {
    question: "Is my data safe?",
    answer: "The password you check is not stored or sent to a server. Breach lookup sends only a SHA-1 hash prefix.",
  },
  {
    question: "What is a passphrase?",
    answer: "A passphrase is a sequence of unrelated words, which is long and easier to remember.",
  },
];

function FAQPopover({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full text-left p-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors ${TRANSITION_CLASS} flex items-center justify-between`}
        aria-expanded={open}
        aria-label={`FAQ: ${question}`}
      >
        <span className="font-medium text-gray-900">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${TRANSITION_CLASS} ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-2 z-50 animate-in fade-in motion-reduce:transition-none">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs text-sm text-gray-700">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
}

export function LearnFAQDialog({ open, onClose }: LearnFAQDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="learn-faq-title">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 id="learn-faq-title" className="text-lg font-bold text-gray-900">Learn & FAQ</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close">
            <X className="w-5 h-5 text-gray-500" aria-hidden="true" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <section aria-labelledby="education-title">
            <h3 id="education-title" className="font-medium text-gray-900 mb-3">Password Security Basics</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {educationCards.map(({ icon: Icon, title, body }, index) => (
                <article key={index} className={CARD_CLASS}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-900" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{title}</h4>
                      <p className="mt-1 text-sm text-gray-600">{body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="faq-title">
            <h3 id="faq-title" className="font-medium text-gray-900 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {faqItems.map(({ question, answer }, index) => (
                <FAQPopover key={index} question={question} answer={answer} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}