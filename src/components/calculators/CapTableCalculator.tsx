import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatCard } from "@/components/StatCard";
import { DollarSign, Percent, PieChart } from "lucide-react";
import { calculateCapTable } from "@/lib/calculations";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCurrency } from "@/contexts/CurrencyContext";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from "recharts";

export const CapTableCalculator = () => {
  const { currency, previousCurrency, convertValue } = useCurrency();
  const [preMoneyValuation, setPreMoneyValuation] = useState(5000000);
  const [investment, setInvestment] = useState(1000000);

  useEffect(() => {
    if (previousCurrency !== currency) {
      setPreMoneyValuation(prev => convertValue(prev));
      setInvestment(prev => convertValue(prev));
    }
  }, [currency, previousCurrency, convertValue]);

  const { postMoneyValuation, investorPercent, foundersPercent } = 
    calculateCapTable(preMoneyValuation, investment);

  const pieData = useMemo(() => [
    { name: 'Founders + ESOP', value: foundersPercent, color: 'hsl(var(--primary))' },
    { name: 'Investor', value: investorPercent, color: 'hsl(var(--accent))' },
  ], [foundersPercent, investorPercent]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Simple Cap Table & Dilution</h2>
        <p className="text-sm text-muted-foreground mt-1">Calculate equity dilution from new investment</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="preMoney" className="cursor-help">Pre-Money Valuation</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Company valuation before new investment</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="preMoney"
              type="number"
              value={preMoneyValuation}
              onChange={(e) => setPreMoneyValuation(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>

          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="investment" className="cursor-help">New Investment Amount</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Amount of new capital being raised</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="investment"
              type="number"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="space-y-3">
          <StatCard
            label="Post-Money Valuation"
            value={formatCurrency(postMoneyValuation, currency)}
            icon={DollarSign}
            variant="success"
          />
          <StatCard
            label="Investor Ownership %"
            value={formatPercent(investorPercent, 2)}
            icon={Percent}
          />
          <StatCard
            label="Founders + ESOP %"
            value={formatPercent(foundersPercent, 2)}
            icon={PieChart}
          />
        </div>
      </div>

      <div className="stat-card">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Ownership Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <RechartsPie>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value.toFixed(2)}%`}
              outerRadius={80}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <RechartsTooltip 
              formatter={(value: number) => `${value.toFixed(2)}%`}
            />
            <Legend />
          </RechartsPie>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
