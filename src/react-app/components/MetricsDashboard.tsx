import { Package, DollarSign, Weight, Target, BarChart3 } from 'lucide-react';
import { Task } from '@/shared/types';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { format, subDays, eachDayOfInterval, isSameDay } from 'date-fns';

interface MetricsDashboardProps {
  tasks: Task[];
}

// Gauge component for circular progress
const Gauge = ({ value, max, title, color }: { value: number; max: number; title: string; color: string }) => {
  const percentage = (value / max) * 100;
  const strokeDasharray = `${percentage * 2.51} 251`;
  
  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="var(--border)"
          strokeWidth="8"
          fill="none"
          className="opacity-30"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-theme-primary">{Math.round(percentage)}</span>
        <span className="text-xs text-theme-secondary">{title}</span>
      </div>
    </div>
  );
};

export default function MetricsDashboard({ tasks }: MetricsDashboardProps) {
  // Calculate metrics
  const totalValue = tasks.reduce((sum, task) => sum + (task.value * task.quantity), 0);
  const totalWeight = tasks.reduce((sum, task) => sum + (task.peso || task.quantity), 0);
  
  const topBrands = [...new Set(tasks.map(t => t.brand))].slice(0, 5);

  // Generate price trend data
  const generatePriceTrend = () => {
    const endDate = new Date();
    const startDate = subDays(endDate, 29);
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    
    return days.map(date => {
      const tasksOnDate = tasks.filter(task => 
        isSameDay(new Date(task.date), date)
      );
      const dailyValue = tasksOnDate.reduce((sum, task) => sum + (task.value * task.quantity), 0);
      
      return {
        date: format(date, 'dd/MM'),
        value: dailyValue,
        weight: tasksOnDate.reduce((sum, task) => sum + (task.peso || task.quantity), 0)
      };
    });
  };

  // Generate radar chart data for price and weight metrics
  const generateRadarData = () => {
    // Group by product and calculate metrics
    const productMetrics = tasks.reduce((acc, task) => {
      const productKey = task.product;
      if (!acc[productKey]) {
        acc[productKey] = {
          totalValue: 0,
          totalWeight: 0,
          count: 0
        };
      }
      acc[productKey].totalValue += task.value * task.quantity;
      acc[productKey].totalWeight += task.peso || task.quantity;
      acc[productKey].count += 1;
      return acc;
    }, {} as Record<string, { totalValue: number; totalWeight: number; count: number }>);

    // Convert to radar data
    const maxValue = Math.max(...Object.values(productMetrics).map(m => m.totalValue));
    const maxWeight = Math.max(...Object.values(productMetrics).map(m => m.totalWeight));
    
    return Object.entries(productMetrics).slice(0, 6).map(([product, metrics]) => ({
      product: product.length > 15 ? product.substring(0, 15) + '...' : product,
      preco: Math.round((metrics.totalValue / maxValue) * 100),
      peso: Math.round((metrics.totalWeight / maxWeight) * 100),
      fullMark: 100
    }));
  };

  const priceTrendData = generatePriceTrend();
  const radarData = generateRadarData();
  const priceChange = priceTrendData.length > 1 ? 
    ((priceTrendData[priceTrendData.length - 1].value - priceTrendData[0].value) / priceTrendData[0].value) * 100 : 0;

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <div className="space-y-6">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Price Metric */}
        <div className="bg-theme-secondary rounded-lg p-4 border border-theme">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-blue-400" />
            <span className={`text-xs ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
            </span>
          </div>
          <div className="text-lg font-bold text-theme-primary mb-1">
            R$ {(totalValue / 1000).toFixed(1)}K
          </div>
          <div className="text-xs text-theme-secondary">Valor Total</div>
          
          {/* Mini line chart */}
          <div className="h-8 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceTrendData.slice(-7)}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={priceChange >= 0 ? '#10b981' : '#ef4444'}
                  strokeWidth={1.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weight Metric */}
        <div className="bg-theme-secondary rounded-lg p-4 border border-theme">
          <div className="flex items-center justify-between mb-2">
            <Weight className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-green-400">+8.4%</span>
          </div>
          <div className="text-lg font-bold text-theme-primary mb-1">
            {(totalWeight / 1000).toFixed(1)}T
          </div>
          <div className="text-xs text-theme-secondary">Peso Total</div>
          
          {/* Mini area chart */}
          <div className="h-8 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceTrendData.slice(-7)}>
                <Area
                  type="monotone"
                  dataKey="weight"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                  strokeWidth={1.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Products Count */}
        <div className="bg-theme-secondary rounded-lg p-4 border border-theme">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-5 h-5 text-orange-400" />
            <span className="text-xs text-green-400">+12.1%</span>
          </div>
          <div className="text-lg font-bold text-theme-primary mb-1">
            {tasks.reduce((sum, task) => sum + task.quantity, 0)}
          </div>
          <div className="text-xs text-theme-secondary">Total Items</div>
          
          {/* Mini bar chart */}
          <div className="h-8 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceTrendData.slice(-7)}>
                <Bar dataKey="value" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Efficiency Index */}
        <div className="bg-theme-secondary rounded-lg p-4 border border-theme">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-green-400" />
            <span className="text-xs text-green-400">+15.3%</span>
          </div>
          <div className="text-lg font-bold text-theme-primary mb-1">
            {Math.round((tasks.length / 30) * 100)}
          </div>
          <div className="text-xs text-theme-secondary">Índice Eficiência</div>
        </div>

        {/* Brand Diversity */}
        <div className="bg-theme-secondary rounded-lg p-4 border border-theme">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-blue-400">+2.1%</span>
          </div>
          <div className="text-lg font-bold text-theme-primary mb-1">
            {topBrands.length}
          </div>
          <div className="text-xs text-theme-secondary">Fabricantes</div>
        </div>
      </div>

      {/* Middle Row - Gauges and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Efficiency Gauge */}
        <div className="bg-theme-secondary rounded-lg p-6 border border-theme">
          <h3 className="text-sm font-medium text-theme-primary mb-4">Índice de Eficiência</h3>
          <Gauge
            value={Math.min(tasks.length * 3, 100)}
            max={100}
            title="Eficiência"
            color="#10b981"
          />
          <div className="text-center mt-4">
            <span className="text-xs text-theme-secondary">
              Meta: 100 | Atual: {Math.min(tasks.length * 3, 100)}
            </span>
          </div>
        </div>

        {/* Weight Season Index */}
        <div className="bg-theme-secondary rounded-lg p-6 border border-theme">
          <h3 className="text-sm font-medium text-theme-primary mb-4">Índice Sazonal de Peso</h3>
          <div className="mb-4">
            <div className="text-2xl font-bold text-theme-primary mb-2">
              {Math.round((totalWeight / (tasks.length || 1)) * 10)}
              <span className="text-sm text-theme-secondary">/100</span>
            </div>
          </div>
          
          {/* Season slider */}
          <div className="relative mb-4">
            <div className="h-2 bg-gradient-to-r from-orange-400 via-blue-400 to-purple-400 rounded-full"></div>
            <div 
              className="absolute top-0 w-4 h-2 bg-white rounded-full shadow-lg transform -translate-x-1/2"
              style={{ left: `${Math.min((totalWeight / (tasks.length || 1)) * 2, 100)}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-xs text-theme-secondary">
            <span>Peso Baixo</span>
            <span>Peso Alto</span>
          </div>
        </div>

        {/* Market Cap Style */}
        <div className="bg-theme-secondary rounded-lg p-6 border border-theme">
          <h3 className="text-sm font-medium text-theme-primary mb-4">Valor de Mercado</h3>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-theme-secondary">Market Cap</div>
              <div className="text-lg font-bold text-theme-primary">
                R$ {(totalValue / 1000).toFixed(1)}K
              </div>
            </div>
            <div>
              <div className="text-xs text-theme-secondary">Volume</div>
              <div className="text-lg font-bold text-blue-400">
                R$ {(totalValue * 0.7 / 1000).toFixed(1)}K
              </div>
            </div>
          </div>
          
          {/* Volume bars */}
          <div className="mt-4 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceTrendData.slice(-10)}>
                <Bar dataKey="value">
                  {priceTrendData.slice(-10).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Radar Chart for Price and Weight Analysis */}
      <div className="bg-theme-secondary rounded-lg p-6 border border-theme">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-theme-primary">Análise de Preços e Peso por Produto</h3>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-theme-secondary">Preço</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-theme-secondary">Peso</span>
            </div>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid 
                stroke="var(--border)" 
                strokeDasharray="3 3"
              />
              <PolarAngleAxis 
                dataKey="product" 
                tick={{ 
                  fontSize: 12, 
                  fill: 'var(--text-secondary)' 
                }}
                className="text-theme-secondary"
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ 
                  fontSize: 10, 
                  fill: 'var(--text-secondary)' 
                }}
                tickCount={6}
                hide={true}
              />
              <Radar
                name="Preço"
                dataKey="preco"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.2}
                strokeWidth={2}
                dot={{
                  r: 4,
                  fill: '#3b82f6',
                  strokeWidth: 2,
                  stroke: '#ffffff'
                }}
              />
              <Radar
                name="Peso"
                dataKey="peso"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.1}
                strokeWidth={2}
                dot={{
                  r: 4,
                  fill: '#8b5cf6',
                  strokeWidth: 2,
                  stroke: '#ffffff'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend below chart */}
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-medium text-theme-primary">Métricas por Produto:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {radarData.map((item, index) => (
              <div key={index} className="flex flex-col items-center p-2 bg-theme-primary/5 rounded-lg border border-theme/50">
                <span className="text-theme-primary font-medium text-center">{item.product}</span>
                <div className="flex space-x-3 mt-1">
                  <span className="text-blue-400 font-bold">P: {item.preco}</span>
                  <span className="text-purple-400 font-bold">W: {item.peso}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row - Flow Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Flow Analysis */}
        <div className="bg-theme-secondary rounded-lg p-6 border border-theme">
          <h3 className="text-lg font-semibold text-theme-primary mb-6">Fluxo de Estoque</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-theme-primary/5 rounded-lg">
              <span className="text-sm text-theme-secondary">Entrada</span>
              <span className="text-lg font-bold text-green-400">+R$ {(totalValue * 0.8 / 1000).toFixed(1)}K</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-theme-primary/5 rounded-lg">
              <span className="text-sm text-theme-secondary">Saída</span>
              <span className="text-lg font-bold text-red-400">-R$ {(totalValue * 0.2 / 1000).toFixed(1)}K</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-theme-primary/5 rounded-lg">
              <span className="text-sm text-theme-secondary">Balanço</span>
              <span className="text-lg font-bold text-blue-400">R$ {(totalValue * 0.6 / 1000).toFixed(1)}K</span>
            </div>
          </div>
          
          {/* Net flow chart */}
          <div className="mt-6 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceTrendData.slice(-7)}>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
