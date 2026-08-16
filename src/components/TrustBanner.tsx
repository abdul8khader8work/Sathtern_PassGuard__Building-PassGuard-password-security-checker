import { Shield, AlertTriangle, Info } from "lucide-react";

export function TrustBanner() {
  return (
    <section id="privacy" className="border-b border-amber-200 bg-amber-50 p-4" role="region" aria-label="Privacy and trust information">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <Shield className="w-5 h-5 text-amber-700 mt-0.5" aria-hidden="true" />
        </div>
        <div className="flex-1 space-y-2 text-sm text-amber-900">
          <p className="font-medium">
            Your password is analyzed locally in your browser. It is never sent to a server or stored.
          </p>
          <p className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span>For safety, don&apos;t enter a password you actually use.</span>
          </p>
          <p className="flex items-center gap-2">
            <Info className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span>Breach lookup sends only the first 5 characters of a SHA-1 hash.</span>
          </p>
        </div>
      </div>
    </section>
  );
}