import { usePasswordAnalysis } from "./hooks/usePasswordAnalysis";
import { Header } from "./components/Header";
import { TrustBanner } from "./components/TrustBanner";
import { CheckerCard } from "./components/CheckerCard";
import { GeneratorCard } from "./components/GeneratorCard";
import { BottomBar } from "./components/BottomBar";
import { MobileTabs } from "./components/MobileTabs";

function App() {
  const {
    password,
    setPassword,
    isVisible,
    setIsVisible,
    analysisState,
    result,
    breach,
    clearPassword,
  } = usePasswordAnalysis();

  const checkerProps = {
    password,
    setPassword,
    isVisible,
    setIsVisible,
    onClear: clearPassword,
    analysisState,
    result,
    breach,
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-4">
        <TrustBanner />
        <div className="mt-4 hidden gap-6 md:grid md:grid-cols-2 md:items-start">
          <section className="md:max-h-[calc(100vh-16rem)] md:overflow-y-auto">
            <CheckerCard {...checkerProps} />
          </section>
          <section>
            <GeneratorCard />
          </section>
        </div>
        <MobileTabs checkerProps={checkerProps} />
      </main>
      <BottomBar />
    </div>
  );
}

export default App;