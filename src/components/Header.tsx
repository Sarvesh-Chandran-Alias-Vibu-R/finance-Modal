import { Calculator } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCurrency } from "@/contexts/CurrencyContext";

export const Header = () => {
  const { currency, setCurrency } = useCurrency();
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Calculator className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Finance Models</h1>
              <p className="text-sm text-muted-foreground">Startup & Student Edition</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="currency" className="text-sm font-medium text-muted-foreground">
              Currency:
            </label>
            <Select value={currency} onValueChange={(v) => setCurrency(v as any)}>
              <SelectTrigger id="currency" className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">INR</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
};
