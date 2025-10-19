import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Task } from '@/shared/types';
import { format, subDays, eachDayOfInterval, isSameDay } from 'date-fns';

interface TradingChartProps {
  tasks: Task[];
}

export default function TradingChart({ tasks }: TradingChartProps) {
  // Generate trading-style data for the last 30 days
  const generateTradingData = () => {
    const endDate = new Date();
    const startDate = subDays(endDate, 29);
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    
    return days.map((date, index) => {
      const tasksOnDate = tasks.filter(task => 
        isSameDay(new Date(task.date), date)
      );
      
      const dailyValue = tasksOnDate.reduce((sum, task) => sum + (task.value * task.quantity), 0);
      const previousValue = index > 0 ? 
        tasks.filter(task => 
          isSameDay(new Date(task.date), subDays(date, 1))
        ).reduce((sum, task) => sum + (task.value * task.quantity), 0) : dailyValue;
      
      // Simulate some variance for demonstration
      const variance = (Math.random() - 0.5) * 0.1; // ±10% variance
      const open = previousValue * (1 + variance);
      const close = dailyValue;
      const high = Math.max(open, close) * (1 + Math.random() * 0.05);
      const low = Math.min(open, close) * (1 - Math.random() * 0.05);
      
      const isPositive = close >= open;
      
      return {
        date: format(date, 'dd/MM'),
        open,
        high,
        low,
        close,
        value: dailyValue,
        volume: tasksOnDate.length,
        isPositive,
        color: isPositive ? '#10b981' : '#ef4444'
      };
    });
  };

  const tradingData = generateTradingData();
  const maxValue = Math.max(...tradingData.map(d => d.high));
  const minValue = Math.min(...tradingData.map(d => d.low));
  

  // Custom candlestick component
  const Candlestick = (props: any) => {
    const { payload, x, y, width, height } = props;
    if (!payload) return null;

    const { open, high, low, close, isPositive } = payload;
    const color = isPositive ? '#10b981' : '#ef4444';
    
    // Calculate positions
    const yScale = (value: number) => {
      const range = maxValue - minValue;
      return height - ((value - minValue) / range) * height + y;
    };

    const openY = yScale(open);
    const closeY = yScale(close);
    const highY = yScale(high);
    const lowY = yScale(low);
    
    const bodyTop = Math.min(openY, closeY);
    const bodyHeight = Math.abs(openY - closeY);
    const centerX = x + width / 2;

    return (
      <g>
        {/* High-Low line */}
        <line
          x1={centerX}
          y1={highY}
          x2={centerX}
          y2={lowY}
          stroke={color}
          strokeWidth={1}
        />
        {/* Body rectangle */}
        <rect
          x={x + width * 0.2}
          y={bodyTop}
          width={width * 0.6}
          height={Math.max(bodyHeight, 2)}
          fill={isPositive ? color : color}
          fillOpacity={isPositive ? 0.8 : 1}
          stroke={color}
          strokeWidth={1}
        />
      </g>
    );
  };

  const buySignalIndex = Math.floor(tradingData.length * 0.25);
  const sellSignalIndex = Math.floor(tradingData.length * 0.75);

  return (
    <div className="bg-theme-secondary rounded-xl p-6 border border-theme">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-theme-primary">Análise de Valor (30 dias)</h3>
      </div>
      
      <div className="h-80 relative">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={tradingData}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="var(--border)"
              opacity={0.3} 
            />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
            />
            
            {/* Candlesticks */}
            <Bar 
              dataKey="close" 
              shape={<Candlestick />}
              fill="transparent"
            />
          </ComposedChart>
        </ResponsiveContainer>
        
        {/* BUY/SELL Labels */}
        <div className="absolute inset-0 pointer-events-none">
          {/* BUY Label */}
          <div 
            className="absolute text-green-500 font-bold text-sm"
            style={{
              left: `${(buySignalIndex / tradingData.length) * 100}%`,
              bottom: '30%',
              transform: 'translateX(-50%)'
            }}
          >
            BUY
          </div>
          
          {/* SELL Label */}
          <div 
            className="absolute text-red-500 font-bold text-sm"
            style={{
              left: `${(sellSignalIndex / tradingData.length) * 100}%`,
              top: '20%',
              transform: 'translateX(-50%)'
            }}
          >
            SELL
          </div>
        </div>
      </div>
    </div>
  );
}
