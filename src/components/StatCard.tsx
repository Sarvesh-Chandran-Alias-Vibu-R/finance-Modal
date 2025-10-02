import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
}

export const StatCard = ({ label, value, icon: Icon, variant = 'default' }: StatCardProps) => {
  const variantClasses = {
    default: 'border-border',
    success: 'border-success/20 bg-success/5',
    warning: 'border-warning/20 bg-warning/5',
    destructive: 'border-destructive/20 bg-destructive/5',
  };

  const textClasses = {
    default: 'text-foreground',
    success: 'text-success',
    warning: 'text-warning',
    destructive: 'text-destructive',
  };

  return (
    <div className={`stat-card ${variantClasses[variant]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className={`mt-2 text-2xl font-bold ${textClasses[variant]}`}>{value}</p>
        </div>
        {Icon && (
          <Icon className={`h-5 w-5 ${textClasses[variant]} opacity-60`} />
        )}
      </div>
    </div>
  );
};
