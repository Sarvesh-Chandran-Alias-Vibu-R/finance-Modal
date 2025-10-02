import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { TabNavigation } from "@/components/TabNavigation";
import { ScenarioManager } from "@/components/ScenarioManager";
import { LearningTab } from "@/components/LearningTab";
import { RunwayCalculator } from "@/components/calculators/RunwayCalculator";
import { BreakEvenCalculator } from "@/components/calculators/BreakEvenCalculator";
import { UnitEconomicsCalculator } from "@/components/calculators/UnitEconomicsCalculator";
import { CacLtvCalculator } from "@/components/calculators/CacLtvCalculator";
import { PricingGstCalculator } from "@/components/calculators/PricingGstCalculator";
import { EmiCalculator } from "@/components/calculators/EmiCalculator";
import { NpvCalculator } from "@/components/calculators/NpvCalculator";
import { CapTableCalculator } from "@/components/calculators/CapTableCalculator";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CalculatorsPage = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<string>(tabFromUrl || 'overview');

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const handleLoadScenario = (scenarioId: string) => {
    const saved = localStorage.getItem(`scenario-${scenarioId}`);
    if (saved) {
      const data = JSON.parse(saved);
      setActiveTab(data.activeTab);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
                Finance Models for Startups & Students
              </h1>
              <p className="text-lg text-muted-foreground">
                Interactive calculators to help you make faster, more accurate financial decisions.
                Select a category above to get started.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Runway", desc: "Calculate how long your cash will last", tab: "fundraising" },
                { title: "CAC & LTV", desc: "Measure growth efficiency", tab: "growth" },
                { title: "Break-Even", desc: "Find your profitability threshold", tab: "operations" },
                { title: "Unit Economics", desc: "Understand unit-level profitability", tab: "operations" },
                { title: "Cap Table", desc: "Calculate equity dilution", tab: "valuation" },
                { title: "Pricing + GST", desc: "Optimize pricing with taxes", tab: "pricing" },
                { title: "Loan EMI", desc: "Calculate loan payments", tab: "pricing" },
                { title: "NPV", desc: "Evaluate project viability", tab: "valuation" },
              ].map((item) => (
                <Card 
                  key={item.title}
                  className="stat-card cursor-pointer group"
                  onClick={() => setActiveTab(item.tab)}
                >
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'fundraising':
        return (
          <div className="grid gap-8">
            <RunwayCalculator />
          </div>
        );

      case 'operations':
        return (
          <div className="grid gap-8">
            <BreakEvenCalculator />
            <UnitEconomicsCalculator />
          </div>
        );

      case 'growth':
        return (
          <div className="grid gap-8">
            <CacLtvCalculator />
          </div>
        );

      case 'valuation':
        return (
          <div className="grid gap-8">
            <CapTableCalculator />
            <NpvCalculator />
          </div>
        );

      case 'pricing':
        return (
          <div className="grid gap-8">
            <PricingGstCalculator />
            <EmiCalculator />
          </div>
        );

      case 'learning':
        return <LearningTab />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <ScenarioManager activeTab={activeTab} onLoadScenario={handleLoadScenario} />
      
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Built for student innovators, campus clubs, and early-stage founders.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CalculatorsPage;
