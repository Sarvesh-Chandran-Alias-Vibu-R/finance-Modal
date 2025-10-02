import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Currency } from '@/lib/formatters';

// Approximate conversion rates (relative to INR as base)
const CONVERSION_RATES: Record<Currency, number> = {
  INR: 1,
  USD: 83,    // 1 USD ≈ 83 INR
  EUR: 90,    // 1 EUR ≈ 90 INR
};

interface CurrencyContextType {
  currency: Currency;
  previousCurrency: Currency;
  setCurrency: (currency: Currency) => void;
  convertValue: (value: number, fromCurrency?: Currency, toCurrency?: Currency) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<Currency>('INR');
  const [previousCurrency, setPreviousCurrency] = useState<Currency>('INR');

  const setCurrency = (newCurrency: Currency) => {
    setPreviousCurrency(currency);
    setCurrencyState(newCurrency);
  };

  const convertValue = (
    value: number, 
    fromCurrency: Currency = previousCurrency, 
    toCurrency: Currency = currency
  ): number => {
    if (fromCurrency === toCurrency || !isFinite(value)) return value;
    
    // Convert to INR first (base currency), then to target currency
    const inINR = value * CONVERSION_RATES[fromCurrency];
    const converted = inINR / CONVERSION_RATES[toCurrency];
    
    return Math.round(converted * 100) / 100; // Round to 2 decimal places
  };

  return (
    <CurrencyContext.Provider value={{ currency, previousCurrency, setCurrency, convertValue }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};
