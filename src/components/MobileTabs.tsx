import { useState } from "react";
import { ShieldCheck, RefreshCw } from "lucide-react";
import { TRANSITION_CLASS } from "../lib/constants";
import { CheckerCard } from "./CheckerCard";
import { GeneratorCard } from "./GeneratorCard";

interface MobileTabsProps {
  checkerProps: React.ComponentProps<typeof CheckerCard>;
}

export function MobileTabs({ checkerProps }: MobileTabsProps) {
  const [activeTab, setActiveTab] = useState<"check" | "generate">("check");

  return (
    <div className="md:hidden">
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab("check")}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${TRANSITION_CLASS} flex items-center justify-center gap-2 ${
            activeTab === "check"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
          role="tab"
          aria-selected={activeTab === "check"}
          aria-controls="check-panel"
          id="check-tab"
        >
          <ShieldCheck className="w-4 h-4" aria-hidden="true" />
          Check
        </button>
        <button
          onClick={() => setActiveTab("generate")}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${TRANSITION_CLASS} flex items-center justify-center gap-2 ${
            activeTab === "generate"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
          role="tab"
          aria-selected={activeTab === "generate"}
          aria-controls="generate-panel"
          id="generate-tab"
        >
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
          Generate
        </button>
      </div>

      <div id="check-panel" role="tabpanel" aria-labelledby="check-tab" hidden={activeTab !== "check"}>
        <CheckerCard {...checkerProps} />
      </div>

      <div id="generate-panel" role="tabpanel" aria-labelledby="generate-tab" hidden={activeTab !== "generate"}>
        <GeneratorCard />
      </div>
    </div>
  );
}