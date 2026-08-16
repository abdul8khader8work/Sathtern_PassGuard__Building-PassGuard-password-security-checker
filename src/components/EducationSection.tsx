import { Shield, Link2, Key } from "lucide-react";
import { CARD_CLASS } from "../lib/constants";

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

export function EducationSection() {
  return (
    <section aria-labelledby="education-heading" className="space-y-4">
      <h2 id="education-heading" className="text-xl font-bold text-gray-900">
        Learn About Password Security
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {educationCards.map(({ icon: Icon, title, body }, index) => (
          <article key={index} className={CARD_CLASS}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-gray-900" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{title}</h3>
                <p className="mt-1 text-sm text-gray-600">{body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}