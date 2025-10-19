import { Package, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Task } from '@/shared/types';
import { useState } from 'react';

interface ProductTableProps {
  tasks: Task[];
  onSort: (field: 'date' | 'quantity' | 'value' | 'expiryDate' | 'totalPrice' | 'weight') => void;
  sortField: string;
  sortOrder: 'asc' | 'desc';
  onDelete: (id: string) => void;
}

export default function ProductTable({
  tasks,
  onSort,
  sortField,
  sortOrder,
  onDelete
}: ProductTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(tasks.length / itemsPerPage);
  
  const paginatedTasks = tasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getSortIcon = (field: string) => {
    if (sortField !== field) return '';
    return sortOrder === 'asc' ? ' ↑' : ' ↓';
  };

  // Format numbers with abbreviations
  const formatNumber = (value: number, isCurrency: boolean = false): string => {
    if (isCurrency) {
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1).replace('.0', '')}m`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1).replace('.0', '')}k`;
    }
    
    return value.toFixed(2);
  };

  // Format weight with kg/tons
  const formatWeight = (quantity: number): string => {
    // Assuming each unit is approximately 1kg for demonstration
    const kg = quantity * 1;
    
    if (kg >= 1000) {
      const tons = kg / 1000;
      return `${kg}kg - ${tons.toFixed(1)}t`;
    }
    
    return `${kg}kg`;
  };

  // Get gradient for product icon
  const getGradient = (index: number): string => {
    const gradients = [
      'bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900',
      'bg-gradient-to-br from-amber-500 via-yellow-600 to-orange-700',
      'bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-800',
      'bg-gradient-to-br from-yellow-500 via-amber-600 to-yellow-700',
      'bg-gradient-to-br from-purple-500 via-violet-600 to-purple-800',
    ];
    return gradients[index % gradients.length];
  };

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="bg-theme-secondary rounded-lg border border-theme overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-theme">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-theme-blue" />
            <h2 className="font-semibold text-theme-primary">Rank de Eficiência</h2>
            <span className="bg-theme-accent text-theme-accent-text px-2 py-1 rounded text-sm font-medium">
              {tasks.length} unidades
            </span>
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-theme-secondary-hover disabled:opacity-50 disabled:cursor-not-allowed text-theme-primary"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <span className="text-sm text-theme-secondary">
                Página {currentPage} de {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-theme-secondary-hover disabled:opacity-50 disabled:cursor-not-allowed text-theme-primary"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div>
        <table className="w-full">
          <thead className="bg-theme-primary/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                RANK
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                PRODUTO
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-theme-secondary uppercase tracking-wider cursor-pointer hover:text-theme-primary" onClick={() => onSort('value')}>
                PREÇO UNITÁRIO{getSortIcon('value')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-theme-secondary uppercase tracking-wider cursor-pointer hover:text-theme-primary" onClick={() => onSort('quantity')}>
                CAIXAS{getSortIcon('quantity')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-theme-secondary uppercase tracking-wider cursor-pointer hover:text-theme-primary" onClick={() => onSort('totalPrice')}>
                PREÇO TOTAL{getSortIcon('totalPrice')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-theme-secondary uppercase tracking-wider cursor-pointer hover:text-theme-primary" onClick={() => onSort('weight')}>
                PESO{getSortIcon('weight')}
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-theme-secondary uppercase tracking-wider">REMOVER</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-theme">
            {paginatedTasks.map((task, index) => {
              const globalIndex = (currentPage - 1) * itemsPerPage + index;
              const unitPrice = task.value;
              const totalPrice = task.value * task.quantity;
              
              return (
                <tr key={task.id} className="hover:bg-theme-secondary-hover transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-theme-secondary">
                        {globalIndex + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${getGradient(globalIndex)} rounded-full flex items-center justify-center border border-white/20`}>
                        <Package className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-theme-primary">
                          {task.product}
                        </div>
                        <div className="text-xs text-theme-secondary">
                          {task.brand || 'Marca não informada'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-medium text-theme-green">
                      {formatNumber(unitPrice, true)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-medium text-theme-blue">
                      {Math.round(task.quantity)} cx
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-semibold text-theme-green">
                      {formatNumber(totalPrice, true)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-sm text-theme-primary">
                      {formatWeight(task.quantity)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button 
                      onClick={() => onDelete(task.id)} 
                      className="text-theme-secondary hover:text-theme-error transition-colors p-1 rounded hover:bg-theme-secondary-hover" 
                      title="Remover tarefa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Bottom Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-theme flex justify-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg hover:bg-theme-secondary-hover disabled:opacity-50 disabled:cursor-not-allowed text-theme-primary text-sm"
            >
              Anterior
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentPage === page
                    ? 'bg-theme-accent text-theme-accent-text'
                    : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-secondary-hover'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg hover:bg-theme-secondary-hover disabled:opacity-50 disabled:cursor-not-allowed text-theme-primary text-sm"
            >
              Próximo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
