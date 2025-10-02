import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatCard } from "@/components/StatCard";
import { DollarSign, Percent, TrendingUp, Clock } from "lucide-react";
import { calculateUnitEconomics } from "@/lib/calculations";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCurrency } from "@/contexts/CurrencyContext";

export const UnitEconomicsCalculator = () => {
  const { currency, previousCurrency, convertValue } = useCurrency();
  const [price, setPrice] = useState(100);
  const [variableCost, setVariableCost] = useState(40);
  const [unitsPerMonth, setUnitsPerMonth] = useState(1000);
  const [fixedCosts, setFixedCosts] = useState(30000);
  const [cac, setCac] = useState(50);

  useEffect(() => {
    if (previousCurrency !== currency) {
      setPrice(prev => convertValue(prev));
      setVariableCost(prev => convertValue(prev));
      setFixedCosts(prev => convertValue(prev));
      setCac(prev => convertValue(prev));
    }
  }, [currency, previousCurrency, convertValue]);

  const { contributionMarginUnit, contributionMarginMonth, profitMonth, paybackUnits } = 
    calculateUnitEconomics(price, variableCost, unitsPerMonth, fixedCosts, cac);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Unit Economics</h2>
        <p className="text-sm text-muted-foreground mt-1">Understand profitability at the unit level</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="unit-price" className="cursor-help">Price per Unit</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Selling price of one unit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="unit-price"
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
                  <Label htmlFor="unit-variable" className="cursor-help">Variable Cost per Unit</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cost to produce one unit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="unit-variable"
              type="number"
              value={variableCost}
              onChange={(e) => setVariableCost(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>

          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="units" className="cursor-help">Units Sold per Month</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Number of units sold monthly</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="units"
              type="number"
              value={unitsPerMonth}
              onChange={(e) => setUnitsPerMonth(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>

          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="unit-fixed" className="cursor-help">Fixed Costs per Month</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Monthly costs that don't vary with production</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="unit-fixed"
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
                  <Label htmlFor="cac" className="cursor-help">Customer Acquisition Cost (CAC)</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cost to acquire one customer</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="cac"
              type="number"
              value={cac}
              onChange={(e) => setCac(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="space-y-3">
          <StatCard
            label="Contribution Margin per Unit"
            value={formatCurrency(contributionMarginUnit, currency)}
            icon={DollarSign}
            variant={contributionMarginUnit > 0 ? 'success' : 'destructive'}
          />
          <StatCard
            label="Contribution Margin per Month"
            value={formatCurrency(contributionMarginMonth, currency)}
            icon={Percent}
          />
          <StatCard
            label="Profit per Month"
            value={formatCurrency(profitMonth, currency)}
            icon={TrendingUp}
            variant={profitMonth > 0 ? 'success' : 'destructive'}
          />
          <StatCard
            label="CAC Payback (in units)"
            value={formatNumber(paybackUnits, 1)}
            icon={Clock}
          />
        </div>
      </div>
    </div>
  );
};
