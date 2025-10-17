import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  color?: 'blue' | 'orange' | 'green';
}

export default function MetricCard({ title, value, change, icon, color = 'blue' }: MetricCardProps) {
  const colorClasses = {
    blue: 'text-theme-blue',
    orange: 'text-orange-500',
    green: 'text-theme-green'
  };

  return (
    <div className="bg-theme-secondary rounded-lg p-6 border border-theme hover:border-theme-hover transition-colors">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-theme-secondary">{title}</h3>
        {icon && <div className={colorClasses[color]}>{icon}</div>}
      </div>
      
      <div className="flex items-end space-x-3">
        <span className={`text-2xl font-bold ${colorClasses[color]}`}>
          {value}
        </span>
        
        {change && (
          <div className={`flex items-center space-x-1 text-sm ${
            change.isPositive ? 'text-theme-green' : 'text-theme-error'
          }`}>
            {change.isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{Math.abs(change.value)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
