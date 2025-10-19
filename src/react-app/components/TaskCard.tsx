import { Package, DollarSign, FileText, Trash2, AlertTriangle, Calendar } from 'lucide-react';
import { Task } from '@/shared/types';
import { format, differenceInDays, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onDelete }: TaskCardProps) {
  // Validity control functions
  const getDaysUntilExpiry = (): number | null => {
    if (!task.expiryDate) return null;
    return differenceInDays(new Date(task.expiryDate), new Date());
  };

  const isExpiringSoon = (): boolean => {
    if (!task.expiryDate) return false;
    const daysUntil = getDaysUntilExpiry();
    return daysUntil !== null && daysUntil <= 7 && daysUntil >= 0;
  };

  const isExpired = (): boolean => {
    if (!task.expiryDate) return false;
    return isBefore(new Date(task.expiryDate), new Date());
  };

  const getValidityBadge = () => {
    if (isExpired()) {
      return (
        <div className="flex items-center space-x-1 bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs">
          <AlertTriangle className="w-3 h-3" />
          <span>Expirado</span>
        </div>
      );
    }
    if (isExpiringSoon()) {
      const days = getDaysUntilExpiry();
      return (
        <div className="flex items-center space-x-1 bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs">
          <AlertTriangle className="w-3 h-3" />
          <span>{days} dia{days !== 1 ? 's' : ''}</span>
        </div>
      );
    }
    return null;
  };

  

  return (
    <div className="bg-theme-secondary p-6 rounded-lg shadow-md hover:bg-theme-secondary-hover transition-all duration-300 border border-theme hover:border-theme-hover">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <Package className="w-5 h-5 text-blue-400" />
          <span className="text-sm text-theme-secondary">
            {format(new Date(task.date), 'dd/MM/yyyy', { locale: ptBR })}
          </span>
          {getValidityBadge()}
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-theme-secondary hover:text-theme-error transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-3">
          <Package className="w-4 h-4 text-theme-purple" />
          <span className="text-sm text-theme-secondary">Produto:</span>
          <span className="font-semibold text-theme-primary">{task.product}</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Package className="w-4 h-4 text-theme-blue" />
          <span className="text-sm text-theme-secondary">Quantidade:</span>
          <span className="font-semibold text-theme-primary">{task.quantity}</span>
        </div>
        
        {task.expiryDate && (
          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 text-theme-green" />
            <span className="text-sm text-theme-secondary">Validade:</span>
            <span className="font-semibold text-theme-primary">
              {format(new Date(task.expiryDate), 'dd/MM/yyyy', { locale: ptBR })}
            </span>
          </div>
        )}
        
        <div className="flex items-center space-x-3">
          <DollarSign className="w-4 h-4 text-theme-yellow" />
          <span className="text-sm text-theme-secondary">Valor:</span>
          <span className="font-semibold text-theme-primary">R$ {task.value}</span>
        </div>
      </div>

      {task.description && (
        <div className="border-t border-theme pt-3">
          <div className="flex items-start space-x-2">
            <FileText className="w-4 h-4 text-theme-secondary mt-0.5" />
            <p className="text-sm text-theme-secondary leading-relaxed">{task.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
