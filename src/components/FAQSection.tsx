import { ChevronDown } from "lucide-react";
import { CARD_CLASS, TRANSITION_CLASS } from "../lib/constants";

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

export function FAQSection() {
  return (
    <section aria-labelledby="faq-heading" className="space-y-4">
      <h2 id="faq-heading" className="text-xl font-bold text-gray-900">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqItems.map(({ question, answer }, index) => (
          <details key={index} className={CARD_CLASS}>
            <summary className="flex items-center justify-between cursor-pointer list-none font-medium text-gray-900">
              {question}
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${TRANSITION_CLASS}`} aria-hidden="true" />
            </summary>
            <div className="mt-4 pt-4 border-t border-gray-100 text-gray-600 animate-in fade-in motion-reduce:transition-none">
              {answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}