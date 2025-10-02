export const calculateRunway = (cash: number, monthlyBurn: number) => {
  const runwayMonths = monthlyBurn > 0 ? cash / monthlyBurn : Infinity;
  const runwayDays = runwayMonths * 30;
  const burnMultiple = cash > 0 ? (monthlyBurn * 12) / cash : 0;
  
  return { runwayMonths, runwayDays, burnMultiple };
};

export const calculateBreakEven = (fixedCosts: number, price: number, variableCost: number) => {
  const contributionMargin = price - variableCost;
  const breakEvenUnits = contributionMargin > 0 ? fixedCosts / contributionMargin : Infinity;
  const breakEvenRevenue = breakEvenUnits * price;
  
  return { contributionMargin, breakEvenUnits, breakEvenRevenue };
};

export const calculateUnitEconomics = (
  price: number,
  variableCost: number,
  unitsPerMonth: number,
  fixedCosts: number,
  cac: number
) => {
  const contributionMarginUnit = price - variableCost;
  const contributionMarginMonth = contributionMarginUnit * unitsPerMonth;
  const profitMonth = contributionMarginMonth - fixedCosts;
  const paybackUnits = contributionMarginUnit > 0 ? cac / contributionMarginUnit : Infinity;
  
  return { contributionMarginUnit, contributionMarginMonth, profitMonth, paybackUnits };
};

export const calculateCacLtv = (
  marketingSpend: number,
  newCustomers: number,
  arpu: number,
  grossMargin: number,
  lifespanMonths: number
) => {
  const cac = newCustomers > 0 ? marketingSpend / newCustomers : Infinity;
  const ltv = arpu * (grossMargin / 100) * lifespanMonths;
  const ltvCacRatio = cac > 0 ? ltv / cac : Infinity;
  const paybackMonths = (arpu * (grossMargin / 100)) > 0 ? cac / (arpu * (grossMargin / 100)) : Infinity;
  
  return { cac, ltv, ltvCacRatio, paybackMonths };
};

export const calculatePricingGst = (cost: number, targetMargin: number, gst: number) => {
  const priceBeforeGst = targetMargin < 100 ? cost / (1 - targetMargin / 100) : Infinity;
  const priceAfterGst = priceBeforeGst * (1 + gst / 100);
  const grossMarginPerUnit = priceBeforeGst - cost;
  
  return { priceBeforeGst, priceAfterGst, grossMarginPerUnit };
};

export const calculateEmi = (principal: number, annualRate: number, tenureMonths: number) => {
  if (tenureMonths <= 0) return { emi: 0, totalPayment: 0, totalInterest: 0 };
  
  const r = annualRate / 12 / 100;
  
  if (r === 0) {
    const emi = principal / tenureMonths;
    return { emi, totalPayment: principal, totalInterest: 0 };
  }
  
  const emi = principal * r * Math.pow(1 + r, tenureMonths) / (Math.pow(1 + r, tenureMonths) - 1);
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;
  
  return { emi, totalPayment, totalInterest };
};

export const calculateNpv = (discountRate: number, cashflows: number[]) => {
  const r = discountRate / 100;
  const npv = cashflows.reduce((sum, cf, t) => sum + cf / Math.pow(1 + r, t), 0);
  const periods = cashflows.length - 1;
  const isPositive = npv >= 0;
  
  return { npv, periods, isPositive };
};

export const calculateCapTable = (preMoneyValuation: number, investment: number) => {
  const postMoneyValuation = preMoneyValuation + investment;
  const investorPercent = postMoneyValuation > 0 ? (investment / postMoneyValuation) * 100 : 0;
  const foundersPercent = 100 - investorPercent;
  
  return { postMoneyValuation, investorPercent, foundersPercent };
};
