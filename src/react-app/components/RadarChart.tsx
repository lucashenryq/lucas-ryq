import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { Task } from '@/shared/types';

interface RadarChartProps {
  tasks?: Task[];
}

export default function CustomRadarChart({ tasks = [] }: RadarChartProps) {
  // Calculate distribution by brand from tasks
  const brandDistribution = tasks.reduce((acc, task) => {
    const brand = task.brand || 'Outros';
    if (!acc[brand]) {
      acc[brand] = { totalQuantity: 0, totalValue: 0 };
    }
    acc[brand].totalQuantity += task.quantity;
    acc[brand].totalValue += task.value * task.quantity;
    return acc;
  }, {} as Record<string, { totalQuantity: number; totalValue: number }>);

  // Convert to radar chart data
  const fabricanteData = Object.entries(brandDistribution).map(([brand, data]) => ({
    fabricante: brand,
    value: data.totalQuantity,
    fullMark: Math.max(...Object.values(brandDistribution).map(d => d.totalQuantity)) || 100
  }));

  // If no tasks, show sample data
  if (fabricanteData.length === 0) {
    fabricanteData.push(
      { fabricante: 'Unilever', value: 285, fullMark: 300 },
      { fabricante: 'P&G', value: 190, fullMark: 300 },
      { fabricante: 'Ypê', value: 150, fullMark: 300 },
      { fabricante: 'Reckitt', value: 120, fullMark: 300 },
      { fabricante: 'Start', value: 95, fullMark: 300 },
      { fabricante: 'Gtex', value: 75, fullMark: 300 }
    );
  }

  return (
    <div className="bg-theme-secondary rounded-xl p-6 border border-theme">
      <h3 className="text-lg font-semibold text-theme-primary mb-6">Distribuição por Fabricantes</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={fabricanteData}>
            <PolarGrid 
              stroke="var(--border)" 
              strokeDasharray="3 3"
            />
            <PolarAngleAxis 
              dataKey="fabricante" 
              tick={{ 
                fontSize: 12, 
                fill: 'var(--text-secondary)' 
              }}
              className="text-theme-secondary"
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 'dataMax']} 
              tick={{ 
                fontSize: 10, 
                fill: 'var(--text-secondary)' 
              }}
              tickCount={6}
              hide={true}
            />
            <Radar
              name="Fabricantes"
              dataKey="value"
              stroke="var(--blue)"
              fill="var(--blue)"
              fillOpacity={0.2}
              strokeWidth={2}
              dot={{
                r: 4,
                fill: 'var(--blue)',
                strokeWidth: 2,
                stroke: '#ffffff'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Brands Legend - Below chart */}
      <div className="mt-6 space-y-3">
        <h4 className="text-sm font-medium text-theme-primary mb-3">Distribuição por Fabricante:</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          {fabricanteData.map((fabricante, index) => (
            <div key={index} className="flex flex-col items-center p-2 bg-theme-primary/5 rounded-lg border border-theme/50">
              <span className="text-theme-primary font-medium">{fabricante.fabricante}</span>
              <span className="text-theme-blue font-bold">{fabricante.value} un.</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
