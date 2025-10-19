import { Package, DollarSign, Shield, TrendingDown } from 'lucide-react';
import { Stats, Task } from '@/shared/types';
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell } from 'recharts';
import { format, subDays, eachDayOfInterval, isSameDay } from 'date-fns';

interface StatsSummaryProps {
  stats: Stats;
  tasks: Task[];
}

export default function StatsSummary({ stats, tasks }: StatsSummaryProps) {

  // Generate loss prevention chart data (last 30 days)
  const generateLossPreventionData = () => {
    const endDate = new Date();
    const startDate = subDays(endDate, 29);
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    
    return days.map(date => {
      const tasksOnDate = tasks.filter(task => 
        isSameDay(new Date(task.date), date)
      );
      
      const totalValue = tasksOnDate.reduce((sum, task) => sum + task.value, 0);
      const lossesPreventedValue = totalValue * 0.15; // 15% losses prevented
      const protectedValue = totalValue * 0.92; // 92% of value protected
      
      return {
        date: format(date, 'dd/MM'),
        lossesPreventedValue,
        protectedValue,
        tasks: tasksOnDate.length
      };
    });
  };

  // Generate brand distribution data
  const generateBrandData = () => {
    const brandStats = tasks.reduce((acc, task) => {
      const brand = task.brand || 'Outros';
      if (!acc[brand]) {
        acc[brand] = { count: 0, value: 0 };
      }
      acc[brand].count += 1;
      acc[brand].value += task.value;
      return acc;
    }, {} as Record<string, { count: number; value: number }>);

    return Object.entries(brandStats)
      .map(([brand, data]) => ({
        brand,
        count: data.count,
        value: data.value,
        percentage: (data.count / tasks.length) * 100
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  };

  const lossPreventionData = generateLossPreventionData();
  const brandData = generateBrandData();

  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#84cc16', '#f97316'];

  

  if (stats.totalTasks === 0) {
    return (
      <div className="bg-theme-secondary p-8 rounded-lg border border-theme text-center">
        <Package className="w-12 h-12 text-theme-secondary mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-theme-primary mb-2">
          Nenhuma tarefa registrada
        </h3>
        <p className="text-theme-secondary">
          Adicione sua primeira tarefa para ver as estatísticas
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <Package className="w-8 h-8 opacity-80" />
            <span className="text-xs opacity-75 uppercase tracking-wide">Total</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold">{stats.totalTasks}</p>
            <p className="text-sm opacity-90">Ações de prevenção</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-8 h-8 opacity-80" />
            <span className="text-xs opacity-75 uppercase tracking-wide">Perdas Evitadas</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold">R$ {stats.lossesPreventedValue}</p>
            <p className="text-sm opacity-90">Valor recuperado</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 opacity-80" />
            <span className="text-xs opacity-75 uppercase tracking-wide">Estoque Protegido</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold">R$ {stats.protectedStockValue}</p>
            <p className="text-sm opacity-90">Valor sob proteção</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingDown className="w-8 h-8 opacity-80" />
            <span className="text-xs opacity-75 uppercase tracking-wide">Taxa de Perdas</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold">{stats.lossRate.toFixed(1)}%</p>
            <p className="text-sm opacity-90">Meta: &lt;2%</p>
          </div>
        </div>
      </div>

      {/* Loss Prevention Chart */}
      <div className="bg-theme-secondary rounded-lg p-6 border border-theme">
        <h3 className="text-lg font-semibold text-theme-primary mb-6">Prevenção de Perdas (30 dias)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lossPreventionData}>
              <defs>
                <linearGradient id="lossesPreventedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="protectedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                className="text-theme-secondary"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-theme-secondary"
                tickFormatter={(value) => `R$ ${value.toFixed(0)}`}
              />
              <Area
                type="monotone"
                dataKey="lossesPreventedValue"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#lossesPreventedGradient)"
                name="Perdas Evitadas"
              />
              <Area
                type="monotone"
                dataKey="protectedValue"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#protectedGradient)"
                name="Estoque Protegido"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Distribution */}
        <div className="bg-theme-secondary rounded-lg p-6 border border-theme">
          <h3 className="text-lg font-semibold text-theme-primary mb-6">Distribuição por Fabricante</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={brandData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  className="text-theme-secondary"
                  tickFormatter={(value) => `R$ ${value}`}
                />
                <YAxis 
                  type="category"
                  dataKey="brand"
                  axisLine={false}
                  tickLine={false}
                  className="text-theme-secondary"
                  width={80}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {brandData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Loss Prevention Metrics */}
        <div className="bg-theme-secondary rounded-lg p-6 border border-theme">
          <h3 className="text-lg font-semibold text-theme-primary mb-6">Métricas de Prevenção</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-theme-primary/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-theme-secondary">Efetividade Média</p>
                  <p className="font-semibold text-theme-primary">{stats.averageQuantity.toFixed(0)} itens/ação</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-theme-secondary">Eficiência</p>
                <p className="text-lg font-bold text-blue-600">+12%</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-theme-primary/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-theme-secondary">Valor Médio Protegido</p>
                  <p className="font-semibold text-theme-primary">R$ {stats.averageValue}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-theme-secondary">Proteção</p>
                <p className="text-lg font-bold text-green-600">+8%</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-theme-primary/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-theme-secondary">Redução de Perdas</p>
                  <p className="font-semibold text-theme-primary">{(8 - stats.lossRate).toFixed(1)}%</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-theme-secondary">Melhoria</p>
                <p className="text-lg font-bold text-purple-600">+{(8 - stats.lossRate).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
