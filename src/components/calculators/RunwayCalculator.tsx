import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatCard } from "@/components/StatCard";
import { TrendingDown, Calendar, AlertTriangle } from "lucide-react";
import { calculateRunway } from "@/lib/calculations";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCurrency } from "@/contexts/CurrencyContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

export const RunwayCalculator = () => {
  const { currency, previousCurrency, convertValue } = useCurrency();
  const [cash, setCash] = useState(1000000);
  const [monthlyBurn, setMonthlyBurn] = useState(100000);

  useEffect(() => {
    if (previousCurrency !== currency) {
      setCash(prev => convertValue(prev));
      setMonthlyBurn(prev => convertValue(prev));
    }
  }, [currency, previousCurrency, convertValue]);

  const { runwayMonths, runwayDays, burnMultiple } = calculateRunway(cash, monthlyBurn);

  const chartData = useMemo(() => {
    const months = Math.ceil(runwayMonths) + 1;
    return Array.from({ length: months }, (_, i) => ({
      month: i,
      cash: Math.max(0, cash - (monthlyBurn * i)),
    }));
  }, [cash, monthlyBurn, runwayMonths]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Runway Calculator</h2>
        <p className="text-sm text-muted-foreground mt-1">Calculate how long your cash will last</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="cash" className="cursor-help">Cash in Bank</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total cash available in your bank account</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="cash"
              type="number"
              value={cash}
              onChange={(e) => setCash(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>

          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="burn" className="cursor-help">Monthly Net Burn</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Monthly cash outflow minus cash inflow</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="burn"
              type="number"
              value={monthlyBurn}
              onChange={(e) => setMonthlyBurn(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="space-y-3">
          <StatCard
            label="Runway (Months)"
            value={formatNumber(runwayMonths, 1)}
            icon={Calendar}
            variant={runwayMonths < 6 ? 'destructive' : runwayMonths < 12 ? 'warning' : 'success'}
          />
          <StatCard
            label="Runway (Days)"
            value={formatNumber(runwayDays, 0)}
            icon={TrendingDown}
          />
          <StatCard
            label="Burn Multiple"
            value={formatNumber(burnMultiple, 2)}
            icon={AlertTriangle}
            variant={burnMultiple > 2 ? 'destructive' : 'default'}
          />
        </div>
      </div>

      <div className="stat-card">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Cash Depletion Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="month" 
              label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
              className="text-xs"
            />
            <YAxis 
              label={{ value: 'Cash', angle: -90, position: 'insideLeft' }}
              className="text-xs"
            />
            <RechartsTooltip 
              formatter={(value: number) => formatCurrency(value, currency)}
              labelFormatter={(label) => `Month ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="cash" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
