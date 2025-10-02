export type Currency = 'INR' | 'USD' | 'EUR';

export const formatCurrency = (value: number, currency: Currency): string => {
  if (!isFinite(value)) return '∞';
  
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  
  return formatter.format(value);
};

export const formatNumber = (value: number, decimals: number = 2): string => {
  if (!isFinite(value)) return '∞';
  
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatPercent = (value: number, decimals: number = 2): string => {
  if (!isFinite(value)) return '∞';
  
  return `${formatNumber(value, decimals)}%`;
};
