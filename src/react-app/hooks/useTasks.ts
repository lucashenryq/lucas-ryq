import { useState, useEffect } from 'react';
import { Task, Stats } from '@/shared/types';
import { addDays, isBefore, differenceInDays } from 'date-fns';

const STORAGE_KEY = 'loja22_tasks';

const mockTasks: Task[] = [
  {
    id: '1',
    product: 'Produtos de Limpeza',
    brand: 'Ypê',
    quantity: 150,
    value: 2750.00,
    date: '2024-01-15',
    expiryDate: '2025-01-15',
    description: 'Reposição de produtos de limpeza no corredor 3',
    duration: 52, // 52 minutes
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    product: 'Conservas',
    brand: 'Unilever',
    quantity: 85,
    value: 1850.50,
    date: '2024-01-14',
    expiryDate: '2024-12-14',
    description: 'Reposição de produtos alimentícios no setor de conservas',
    duration: 103, // 1h 43m
    createdAt: '2024-01-14T14:20:00Z'
  },
  {
    id: '3',
    product: 'Bebidas',
    brand: 'BH',
    quantity: 200,
    value: 4200.75,
    date: '2024-01-13',
    expiryDate: '2024-11-13',
    description: 'Reposição de bebidas e refrigerantes no corredor 1',
    duration: 65, // 1h 5m
    createdAt: '2024-01-13T09:15:00Z'
  }
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        // Add missing fields to existing tasks
        const tasksWithUpdatedFields = parsedTasks.map((task: any) => {
          if (!task.duration) {
            // Generate random duration between 15 minutes to 3 hours (180 minutes)
            task.duration = Math.floor(Math.random() * 165) + 15;
          }
          if (!task.product) {
            // Add default product if missing
            task.product = 'Produto Geral';
          }
          if (!task.brand) {
            // Add default brand if missing
            const brands = ['Unilever', 'P&G', 'Gtex', 'Ypê', 'Start', 'Reckitt'];
            task.brand = brands[Math.floor(Math.random() * brands.length)];
          }
          if (!task.expiryDate) {
            // Add default expiry date (6 months from task date)
            task.expiryDate = addDays(new Date(task.date), 180).toISOString().split('T')[0];
          }
          // Remove weight field if it exists
          if (task.weight !== undefined) {
            delete task.weight;
          }
          return task;
        });
        setTasks(tasksWithUpdatedFields);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksWithUpdatedFields));
      } catch {
        setTasks(mockTasks);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTasks));
      }
    } else {
      setTasks(mockTasks);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTasks));
    }
  }, []);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  };

  const getStats = (): Stats => {
    if (tasks.length === 0) {
      return {
        totalTasks: 0,
        totalQuantity: 0,
        totalValue: 0,
        averageQuantity: 0,
        averageValue: 0,
        lossesPreventedValue: 0,
        protectedStockValue: 0,
        lossRate: 0
      };
    }

    const totalQuantity = tasks.reduce((sum, task) => sum + task.quantity, 0);
    const totalValue = tasks.reduce((sum, task) => sum + task.value, 0);
    
    // Calculate loss prevention metrics
    const recoveredItemsValue = totalValue * 0.15; // 15% of total value as recovered/prevented losses
    const protectedStockValue = totalValue * 0.92; // 92% of stock protected from losses
    const lossRate = Math.max(0, 8 - (tasks.length * 0.1)); // Lower loss rate with more prevention activities
    
    return {
      totalTasks: tasks.length,
      totalQuantity,
      totalValue,
      averageQuantity: totalQuantity / tasks.length,
      averageValue: totalValue / tasks.length,
      lossesPreventedValue: recoveredItemsValue,
      protectedStockValue: protectedStockValue,
      lossRate: Math.min(lossRate, 8) // Cap at 8%
    };
  };

  // Validity control functions
  const isItemExpiringSoon = (expiryDate?: string, daysThreshold: number = 7): boolean => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const threshold = addDays(new Date(), daysThreshold);
    return isBefore(expiry, threshold);
  };

  const isItemExpired = (expiryDate?: string): boolean => {
    if (!expiryDate) return false;
    return isBefore(new Date(expiryDate), new Date());
  };

  const getExpiringItems = (daysThreshold: number = 7) => {
    return tasks.filter(task => isItemExpiringSoon(task.expiryDate, daysThreshold));
  };

  const getExpiredItems = () => {
    return tasks.filter(task => isItemExpired(task.expiryDate));
  };

  const getDaysUntilExpiry = (expiryDate?: string): number | null => {
    if (!expiryDate) return null;
    return differenceInDays(new Date(expiryDate), new Date());
  };

  return {
    tasks,
    addTask,
    deleteTask,
    getStats,
    isItemExpiringSoon,
    isItemExpired,
    getExpiringItems,
    getExpiredItems,
    getDaysUntilExpiry
  };
}
