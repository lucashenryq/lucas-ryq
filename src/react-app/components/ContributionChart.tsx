import { format, subDays, eachDayOfInterval, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Task } from '@/shared/types';

interface ContributionChartProps {
  tasks: Task[];
}

export default function ContributionChart({ tasks }: ContributionChartProps) {
  // Generate contribution heatmap data (last 365 days)
  const generateContributionData = () => {
    const endDate = new Date();
    const startDate = subDays(endDate, 364);
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    
    return days.map(date => {
      const tasksOnDate = tasks.filter(task => 
        isSameDay(new Date(task.date), date)
      );
      
      const count = tasksOnDate.length;
      const value = tasksOnDate.reduce((sum, task) => sum + task.value, 0);
      
      return {
        date: format(date, 'yyyy-MM-dd'),
        count,
        value,
        level: count === 0 ? 0 : count <= 1 ? 1 : count <= 3 ? 2 : count <= 5 ? 3 : 4
      };
    });
  };

  const contributionData = generateContributionData();

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-gray-200 dark:bg-gray-700';
      case 1: return 'bg-green-200';
      case 2: return 'bg-green-300';
      case 3: return 'bg-green-400';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-200 dark:bg-gray-700';
    }
  };

  // Create month labels for the top
  const getMonthLabels = () => {
    const months = [];
    const endDate = new Date();
    const startDate = subDays(endDate, 364);
    
    // Generate months from start to end chronologically
    const currentMonth = new Date(startDate);
    for (let i = 0; i < 12; i++) {
      months.push(format(currentMonth, 'MMM', { locale: ptBR }));
      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }
    
    return months;
  };

  const monthLabels = getMonthLabels();

  return (
    <div className="bg-theme-secondary rounded-lg p-4 border border-theme">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-theme-primary">Atividade de Tarefas</h3>
        <span className="text-xs text-theme-secondary">
          {contributionData.filter(d => d.count > 0).length} tarefas no último ano
        </span>
      </div>
      
      {/* Month labels */}
      <div className="flex justify-center mb-2">
        <div className="grid grid-cols-12 gap-4 text-xs text-theme-secondary w-full max-w-2xl">
          {monthLabels.map((month, index) => (
            <div key={index} className="text-center">
              {month}
            </div>
          ))}
        </div>
      </div>

      {/* Contribution grid - organized by weeks */}
      <div className="flex justify-center">
        <div className="flex space-x-0.5 overflow-x-auto">
          {Array.from({ length: 53 }, (_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col space-y-0.5">
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const dataIndex = weekIndex * 7 + dayIndex;
                const day = contributionData[dataIndex];
                
                if (!day) return <div key={dayIndex} className="w-2.5 h-2.5" />;
                
                return (
                  <div
                    key={dayIndex}
                    className={`w-2.5 h-2.5 rounded-sm ${getLevelColor(day.level)} transition-colors cursor-pointer hover:ring-1 hover:ring-theme-accent`}
                    title={`${day.count} tarefas em ${format(new Date(day.date), 'dd/MM/yyyy', { locale: ptBR })}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-theme-secondary mt-2">
        <span>Menos</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-0.5">
            {[0, 1, 2, 3, 4].map(level => (
              <div key={level} className={`w-2.5 h-2.5 rounded-sm ${getLevelColor(level)}`} />
            ))}
          </div>
          <span className="ml-1">Mais</span>
        </div>
      </div>
    </div>
  );
}
