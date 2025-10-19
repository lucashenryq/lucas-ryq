import { Package, Weight, DollarSign } from 'lucide-react';
import { Task } from '@/shared/types';

interface ProductGridProps {
  tasks: Task[];
}

interface ProductSummary {
  product: string;
  brand: string;
  totalQuantity: number;
  totalValue: number;
  completedTasks: number;
  percentage: number;
  lastRestocked: string;
  averageTime: number;
  gradient: string;
}

export default function ProductGrid({ tasks }: ProductGridProps) {
  // Group tasks by product to calculate summary data
  const getProductSummaries = (): ProductSummary[] => {
    const productMap = new Map<string, Task[]>();
    
    // Group tasks by product
    tasks.forEach(task => {
      const key = `${task.product}-${task.brand}`;
      if (!productMap.has(key)) {
        productMap.set(key, []);
      }
      productMap.get(key)!.push(task);
    });

    const totalTasks = tasks.length;
    
    // Genshin-inspired gradients (purple and gold)
    const gradients = [
      'bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900',
      'bg-gradient-to-br from-amber-500 via-yellow-600 to-orange-700',
      'bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-800',
      'bg-gradient-to-br from-yellow-500 via-amber-600 to-yellow-700',
      'bg-gradient-to-br from-purple-500 via-violet-600 to-purple-800',
      'bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-600',
      'bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-800',
      'bg-gradient-to-br from-yellow-600 via-orange-600 to-amber-700',
      'bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800',
      'bg-gradient-to-br from-amber-600 via-yellow-700 to-orange-800',
    ];

    const summaries: ProductSummary[] = [];
    let gradientIndex = 0;

    productMap.forEach((productTasks, key) => {
      const [product, brand] = key.split('-');
      const totalQuantity = productTasks.reduce((sum, task) => sum + task.quantity, 0);
      const totalValue = productTasks.reduce((sum, task) => sum + task.value, 0);
      const completedTasks = productTasks.length;
      const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
      const lastRestocked = productTasks.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0].date;
      const averageTime = productTasks.reduce((sum, task) => sum + task.duration, 0) / productTasks.length;

      summaries.push({
        product,
        brand,
        totalQuantity,
        totalValue,
        completedTasks,
        percentage,
        lastRestocked,
        averageTime,
        gradient: gradients[gradientIndex % gradients.length]
      });
      
      gradientIndex++;
    });

    return summaries.sort((a, b) => b.totalQuantity - a.totalQuantity);
  };

  const formatBrazilianCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const productSummaries = getProductSummaries();

  if (tasks.length === 0) {
    return (
      <div className="bg-theme-secondary rounded-xl p-8 text-center border border-theme">
        <Package className="w-16 h-16 text-theme-secondary mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-theme-primary mb-2">
          Nenhum produto reposto
        </h3>
        <p className="text-theme-secondary">
          Adicione suas primeiras reposições para ver o portfólio
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with overall stats */}
      <div className="bg-theme-secondary rounded-xl p-6 border border-theme">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-theme-primary">Produtos Repostos</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-theme-primary/10 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Package className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-theme-secondary">Total de Produtos</span>
            </div>
            <span className="text-2xl font-bold text-purple-400">
              {tasks.reduce((sum, task) => sum + task.quantity, 0)}
            </span>
          </div>
          
          <div className="bg-theme-primary/10 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Weight className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-theme-secondary">Peso Total</span>
            </div>
            <span className="text-2xl font-bold text-blue-400">
              {tasks.reduce((sum, task) => sum + (task.peso || task.quantity), 0).toFixed(1)}kg
            </span>
          </div>
          
          <div className="bg-theme-primary/10 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-theme-secondary">Preço Total</span>
            </div>
            <span className="text-2xl font-bold text-green-400">
              {formatBrazilianCurrency(tasks.reduce((sum, task) => sum + (task.value * task.quantity), 0))}
            </span>
          </div>
        </div>
      </div>

      {/* Compact Product Grid - Genshin Style */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
        {productSummaries.map((summary) => (
          <div 
            key={`${summary.product}-${summary.brand}`}
            className="group cursor-pointer"
          >
            {/* Main Card */}
            <div className={`${summary.gradient} rounded-lg p-3 h-24 flex flex-col items-center justify-center relative overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25`}>
              {/* Subtle shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              {/* Percentage in top right corner */}
              <div className="absolute top-1 right-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-bold text-white">
                {Math.round(summary.percentage)}%
              </div>
              
              {/* Product Icon */}
              <div className="relative z-10">
                <Package className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
              
              {/* Stars decoration */}
              <div className="absolute bottom-1 right-1 flex space-x-0.5">
                {[...Array(Math.min(5, Math.ceil(summary.percentage / 20)))].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-yellow-300 rounded-full opacity-80" />
                ))}
              </div>
            </div>
            
            {/* Product Info Below */}
            <div className="mt-2 text-center">
              <div className="text-xs font-bold text-theme-primary mb-1 truncate">
                {summary.product}
              </div>
              <div className="text-xs text-theme-secondary truncate">
                {summary.brand}
              </div>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
}
