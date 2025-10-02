import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatCard } from "@/components/StatCard";
import { DollarSign, Package, TrendingUp } from "lucide-react";
import { calculateBreakEven } from "@/lib/calculations";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCurrency } from "@/contexts/CurrencyContext";

export const BreakEvenCalculator = () => {
  const { currency, previousCurrency, convertValue } = useCurrency();
  const [fixedCosts, setFixedCosts] = useState(50000);
  const [price, setPrice] = useState(100);
  const [variableCost, setVariableCost] = useState(40);

  useEffect(() => {
    if (previousCurrency !== currency) {
      setFixedCosts(prev => convertValue(prev));
      setPrice(prev => convertValue(prev));
      setVariableCost(prev => convertValue(prev));
    }
  }, [currency, previousCurrency, convertValue]);

  const { contributionMargin, breakEvenUnits, breakEvenRevenue } = calculateBreakEven(fixedCosts, price, variableCost);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Break-Even Analysis</h2>
        <p className="text-sm text-muted-foreground mt-1">Find out how many units you need to sell to break even</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="fixedCosts" className="cursor-help">Fixed Costs (Monthly)</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Costs that don't vary with production (rent, salaries, etc.)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="fixedCosts"
              type="number"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>

          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="price" className="cursor-help">Price per Unit</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Selling price of one unit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>

          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="variableCost" className="cursor-help">Variable Cost per Unit</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cost to produce one unit (materials, direct labor, etc.)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="variableCost"
              type="number"
              value={variableCost}
              onChange={(e) => setVariableCost(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="space-y-3">
          <StatCard
            label="Contribution Margin per Unit"
            value={formatCurrency(contributionMargin, currency)}
            icon={DollarSign}
            variant={contributionMargin > 0 ? 'success' : 'destructive'}
          />
          <StatCard
            label="Break-Even Units"
            value={formatNumber(breakEvenUnits, 0)}
            icon={Package}
          />
          <StatCard
            label="Break-Even Revenue"
            value={formatCurrency(breakEvenRevenue, currency)}
            icon={TrendingUp}
          />
        </div>
      </div>
    </div>
  );
};
