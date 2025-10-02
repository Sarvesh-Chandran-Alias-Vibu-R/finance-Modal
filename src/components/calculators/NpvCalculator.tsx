import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { DollarSign, Calendar, CheckCircle2, Plus, Trash2 } from "lucide-react";
import { calculateNpv } from "@/lib/calculations";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCurrency } from "@/contexts/CurrencyContext";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine, Legend } from "recharts";

export const NpvCalculator = () => {
  const { currency, previousCurrency, convertValue } = useCurrency();
  const [discountRate, setDiscountRate] = useState(10);
  const [cashflows, setCashflows] = useState<number[]>([-100000, 30000, 40000, 50000, 40000]);

  useEffect(() => {
    if (previousCurrency !== currency) {
      setCashflows(prev => prev.map(cf => convertValue(cf)));
    }
  }, [currency, previousCurrency, convertValue]);

  const { npv, periods, isPositive } = calculateNpv(discountRate, cashflows);

  const chartData = useMemo(() => {
    let cumulative = 0;
    return cashflows.map((cf, index) => {
      cumulative += cf;
      return {
        period: index === 0 ? 'Initial' : `Yr ${index}`,
        cashflow: cf,
        cumulative: cumulative,
        color: cf >= 0 ? 'hsl(var(--success))' : 'hsl(var(--destructive))',
      };
    });
  }, [cashflows]);

  const updateCashflow = (index: number, value: number) => {
    const newCashflows = [...cashflows];
    newCashflows[index] = value;
    setCashflows(newCashflows);
  };

  const addCashflow = () => {
    setCashflows([...cashflows, 0]);
  };

  const removeCashflow = (index: number) => {
    if (cashflows.length > 1) {
      setCashflows(cashflows.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">NPV Calculator</h2>
        <p className="text-sm text-muted-foreground mt-1">Calculate Net Present Value to evaluate project viability</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="discount" className="cursor-help">Discount Rate (%)</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Required rate of return or opportunity cost</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="discount"
              type="number"
              value={discountRate}
              onChange={(e) => setDiscountRate(Number(e.target.value))}
              className="mt-1.5"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label>Cash Flows</Label>
            {cashflows.map((cf, index) => (
              <div key={index} className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label className="w-20 cursor-help text-sm">
                        {index === 0 ? 'Initial' : `Year ${index}`}
                      </Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{index === 0 ? 'Initial investment (usually negative)' : `Cash flow in year ${index}`}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Input
                  type="number"
                  value={cf}
                  onChange={(e) => updateCashflow(index, Number(e.target.value))}
                  className="flex-1"
                />
                {index > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCashflow(index)}
                    className="shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={addCashflow}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Cash Flow
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <StatCard
            label="Net Present Value (NPV)"
            value={formatCurrency(npv, currency)}
            icon={DollarSign}
            variant={isPositive ? 'success' : 'destructive'}
          />
          <StatCard
            label="Number of Periods"
            value={periods}
            icon={Calendar}
          />
          <StatCard
            label="Project Viability"
            value={isPositive ? 'Acceptable' : 'Not Viable'}
            icon={CheckCircle2}
            variant={isPositive ? 'success' : 'destructive'}
          />
        </div>
      </div>

      <div className="stat-card">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Cash Flow Analysis</h3>
        <ResponsiveContainer width="100%" height={250}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="period" className="text-xs" />
            <YAxis className="text-xs" />
            <RechartsTooltip 
              formatter={(value: number) => formatCurrency(value, currency)}
            />
            <Legend />
            <ReferenceLine y={0} stroke="hsl(var(--border))" strokeWidth={2} />
            <Line 
              type="monotone" 
              dataKey="cumulative" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="Cumulative Cash Flow"
              dot={{ fill: "hsl(var(--primary))", r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="cashflow" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Period Cash Flow"
              dot={{ fill: "hsl(var(--accent))", r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
