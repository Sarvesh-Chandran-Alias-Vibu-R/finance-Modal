import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="h-auto w-full justify-start gap-2 rounded-none border-0 bg-transparent p-0">
            <TabsTrigger 
              value="overview" 
              className="rounded-t-lg border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="fundraising"
              className="rounded-t-lg border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Fundraising
            </TabsTrigger>
            <TabsTrigger 
              value="operations"
              className="rounded-t-lg border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Operations
            </TabsTrigger>
            <TabsTrigger 
              value="growth"
              className="rounded-t-lg border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Growth
            </TabsTrigger>
            <TabsTrigger 
              value="valuation"
              className="rounded-t-lg border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Valuation
            </TabsTrigger>
            <TabsTrigger 
              value="pricing"
              className="rounded-t-lg border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Pricing & Tax
            </TabsTrigger>
            <TabsTrigger 
              value="learning"
              className="rounded-t-lg border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Learning
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
