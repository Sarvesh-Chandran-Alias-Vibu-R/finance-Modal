import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatCard } from "@/components/StatCard";
import { DollarSign, TrendingUp, Activity, Clock } from "lucide-react";
import { calculateCacLtv } from "@/lib/calculations";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCurrency } from "@/contexts/CurrencyContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";

export const CacLtvCalculator = () => {
  const { currency, previousCurrency, convertValue } = useCurrency();
  const [marketingSpend, setMarketingSpend] = useState(50000);
  const [newCustomers, setNewCustomers] = useState(500);
  const [arpu, setArpu] = useState(50);
  const [grossMargin, setGrossMargin] = useState(70);
  const [lifespanMonths, setLifespanMonths] = useState(24);

  useEffect(() => {
    if (previousCurrency !== currency) {
      setMarketingSpend(prev => convertValue(prev));
      setArpu(prev => convertValue(prev));
    }
  }, [currency, previousCurrency, convertValue]);

  const { cac, ltv, ltvCacRatio, paybackMonths } = 
    calculateCacLtv(marketingSpend, newCustomers, arpu, grossMargin, lifespanMonths);

  const chartData = useMemo(() => {
    const months = Math.ceil(lifespanMonths);
    return Array.from({ length: months + 1 }, (_, i) => ({
      month: i,
      cumulativeCost: cac,
      cumulativeValue: (arpu * (grossMargin / 100)) * i,
    }));
  }, [cac, arpu, grossMargin, lifespanMonths]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">CAC & LTV Analysis</h2>
        <p className="text-sm text-muted-foreground mt-1">Measure growth efficiency and customer value</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="marketing" className="cursor-help">Marketing Spend</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total marketing and sales expenses</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="marketing"
              type="number"
              value={marketingSpend}
              onChange={(e) => setMarketingSpend(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>

          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="customers" className="cursor-help">New Customers Acquired</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Number of new customers from the campaign</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="customers"
              type="number"
              value={newCustomers}
              onChange={(e) => setNewCustomers(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>

          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="arpu" className="cursor-help">ARPU (Monthly)</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Average Revenue Per User per month</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="arpu"
              type="number"
              value={arpu}
              onChange={(e) => setArpu(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>

          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="margin" className="cursor-help">Gross Margin (%)</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Percentage of revenue kept after direct costs</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="margin"
              type="number"
              value={grossMargin}
              onChange={(e) => setGrossMargin(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>

          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="lifespan" className="cursor-help">Customer Lifespan (Months)</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Average number of months a customer stays</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="lifespan"
              type="number"
              value={lifespanMonths}
              onChange={(e) => setLifespanMonths(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="space-y-3">
          <StatCard
            label="Customer Acquisition Cost (CAC)"
            value={formatCurrency(cac, currency)}
            icon={DollarSign}
          />
          <StatCard
            label="Lifetime Value (LTV)"
            value={formatCurrency(ltv, currency)}
            icon={TrendingUp}
            variant="success"
          />
          <StatCard
            label="LTV:CAC Ratio"
            value={formatNumber(ltvCacRatio, 2)}
            icon={Activity}
            variant={ltvCacRatio >= 3 ? 'success' : ltvCacRatio >= 1 ? 'warning' : 'destructive'}
          />
          <StatCard
            label="CAC Payback Period (Months)"
            value={formatNumber(paybackMonths, 1)}
            icon={Clock}
          />
        </div>
      </div>

      <div className="stat-card">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Customer Value Over Lifetime</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="month" 
              label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
              className="text-xs"
            />
            <YAxis 
              label={{ value: 'Value', angle: -90, position: 'insideLeft' }}
              className="text-xs"
            />
            <RechartsTooltip 
              formatter={(value: number) => formatCurrency(value, currency)}
              labelFormatter={(label) => `Month ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="cumulativeCost" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              name="CAC"
              dot={{ fill: "hsl(var(--destructive))" }}
            />
            <Line 
              type="monotone" 
              dataKey="cumulativeValue" 
              stroke="hsl(var(--success))" 
              strokeWidth={2}
              name="Cumulative LTV"
              dot={{ fill: "hsl(var(--success))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
