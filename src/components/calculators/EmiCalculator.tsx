import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatCard } from "@/components/StatCard";
import { DollarSign, TrendingUp, Percent } from "lucide-react";
import { calculateEmi } from "@/lib/calculations";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCurrency } from "@/contexts/CurrencyContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from "recharts";

export const EmiCalculator = () => {
  const { currency, previousCurrency, convertValue } = useCurrency();
  const [principal, setPrincipal] = useState(1000000);
  const [annualRate, setAnnualRate] = useState(10);
  const [tenureMonths, setTenureMonths] = useState(36);

  useEffect(() => {
    if (previousCurrency !== currency) {
      setPrincipal(prev => convertValue(prev));
    }
  }, [currency, previousCurrency, convertValue]);

  const { emi, totalPayment, totalInterest } = calculateEmi(principal, annualRate, tenureMonths);

  const pieData = useMemo(() => [
    { name: 'Principal', value: principal, color: 'hsl(var(--primary))' },
    { name: 'Interest', value: totalInterest, color: 'hsl(var(--warning))' },
  ], [principal, totalInterest]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Loan EMI Calculator</h2>
        <p className="text-sm text-muted-foreground mt-1">Calculate monthly loan payments and total interest</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="principal" className="cursor-help">Loan Amount (Principal)</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total amount of the loan</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>

          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="rate" className="cursor-help">Annual Interest Rate (%)</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Yearly interest rate percentage</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="rate"
              type="number"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="mt-1.5"
              step="0.1"
            />
          </div>

          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="tenure" className="cursor-help">Tenure (Months)</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Loan repayment period in months</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              id="tenure"
              type="number"
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="space-y-3">
          <StatCard
            label="Monthly EMI"
            value={formatCurrency(emi, currency)}
            icon={DollarSign}
            variant="default"
          />
          <StatCard
            label="Total Payment"
            value={formatCurrency(totalPayment, currency)}
            icon={TrendingUp}
          />
          <StatCard
            label="Total Interest"
            value={formatCurrency(totalInterest, currency)}
            icon={Percent}
            variant={totalInterest > principal * 0.3 ? 'warning' : 'default'}
          />
        </div>
      </div>

      <div className="stat-card">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Payment Breakdown</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={80}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <RechartsTooltip 
              formatter={(value: number) => formatCurrency(value, currency)}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
