import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatCard } from "@/components/StatCard";
import { DollarSign, Percent, TrendingUp } from "lucide-react";
import { calculatePricingGst } from "@/lib/calculations";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCurrency } from "@/contexts/CurrencyContext";

export const PricingGstCalculator = () => {
  const { currency, previousCurrency, convertValue } = useCurrency();
  const [cost, setCost] = useState(100);
  const [targetMargin, setTargetMargin] = useState(60);
  const [gst, setGst] = useState(18);

  useEffect(() => {
    if (previousCurrency !== currency) {
      setCost(prev => convertValue(prev));
    }
  }, [currency, previousCurrency, convertValue]);

  const { priceBeforeGst, priceAfterGst, grossMarginPerUnit } = 
    calculatePricingGst(cost, targetMargin, gst);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Pricing + GST Calculator</h2>
        <p className="text-sm text-muted-foreground mt-1">Calculate optimal pricing with tax considerations</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="cost" className="cursor-help">Unit Cost</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total cost to produce or acquire one unit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="cost"
              type="number"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>

          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="margin" className="cursor-help">Target Margin (%)</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Desired profit margin percentage</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="margin"
              type="number"
              value={targetMargin}
              onChange={(e) => setTargetMargin(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>

          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="gst" className="cursor-help">GST (%)</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Goods and Services Tax percentage (e.g., 18% in India)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="gst"
              type="number"
              value={gst}
              onChange={(e) => setGst(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="space-y-3">
          <StatCard
            label="Price Before GST"
            value={formatCurrency(priceBeforeGst, currency)}
            icon={DollarSign}
            variant="success"
          />
          <StatCard
            label="Price After GST (List Price)"
            value={formatCurrency(priceAfterGst, currency)}
            icon={Percent}
          />
          <StatCard
            label="Gross Margin per Unit"
            value={formatCurrency(grossMarginPerUnit, currency)}
            icon={TrendingUp}
          />
        </div>
      </div>
    </div>
  );
};
