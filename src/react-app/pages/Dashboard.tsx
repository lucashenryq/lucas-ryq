import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import clsx from 'clsx';
import Header from '@/react-app/components/Header';
import Sidebar from '@/react-app/components/Sidebar';
import StatsSummary from '@/react-app/components/StatsSummary';
import AddTaskModal from '@/react-app/components/AddTaskModal';
import ProductTable from '@/react-app/components/ProductTable';
import ProductGrid from '@/react-app/components/ProductGrid';
import ProfileSection from '@/react-app/components/ProfileSection';
import ContributionChart from '@/react-app/components/ContributionChart';

import MetricsDashboard from '@/react-app/components/MetricsDashboard';
import Contact from '@/react-app/pages/Contact';
import { useTasks } from '@/react-app/hooks/useTasks';

type SortField = 'date' | 'quantity' | 'value' | 'expiryDate' | 'totalPrice' | 'weight';
type SortOrder = 'asc' | 'desc';
type TimeFilter = '24h' | '7d' | '1m' | '1a' | 'all';

export default function Dashboard() {
  const { tasks, addTask, deleteTask, getStats } = useTasks();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'stats' | 'contact'>('dashboard');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('7d');

  const stats = getStats();

  // Close mobile menu when switching tabs
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  // Mouse tracking for sidebar hover - only when no modal is open
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Only apply this behavior on desktop (md breakpoint and above)
      if (window.innerWidth < 768) return;
      
      // Disable sidebar functionality when modal is open
      if (isAddModalOpen) return;

      const mouseX = e.clientX;
      
      if (mouseX <= 100) {
        // Mouse is within 100px of left edge - expand sidebar
        setIsSidebarHovered(true);
      } else if (mouseX >= 280) {
        // Mouse is 280px or more from left edge - collapse sidebar
        setIsSidebarHovered(false);
      }
      // Between 100px and 280px, maintain current state
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isAddModalOpen]);

  // Helper function to filter tasks by time
  const filterTasksByTime = (task: any) => {
    const taskDate = new Date(task.date);
    const now = new Date();
    
    switch (timeFilter) {
      case '24h':
        return now.getTime() - taskDate.getTime() <= 24 * 60 * 60 * 1000;
      case '7d':
        return now.getTime() - taskDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
      case '1m':
        return now.getTime() - taskDate.getTime() <= 30 * 24 * 60 * 60 * 1000;
      case '1a':
        return now.getTime() - taskDate.getTime() <= 365 * 24 * 60 * 60 * 1000;
      case 'all':
      default:
        return true;
    }
  };

  // Filter and sort tasks
  const filteredAndSortedTasks = tasks
    .filter(task => 
      (task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       task.date.includes(searchTerm)) &&
      filterTasksByTime(task)
    )
    .sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortField) {
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'quantity':
          aValue = a.quantity;
          bValue = b.quantity;
          break;
        case 'expiryDate':
          aValue = a.expiryDate ? new Date(a.expiryDate).getTime() : 0;
          bValue = b.expiryDate ? new Date(b.expiryDate).getTime() : 0;
          break;
        case 'value':
          aValue = a.value;
          bValue = b.value;
          break;
        case 'totalPrice':
          aValue = a.value * a.quantity;
          bValue = b.value * b.quantity;
          break;
        case 'weight':
          aValue = a.quantity;
          bValue = b.quantity;
          break;
        default:
          aValue = a.date;
          bValue = b.date;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="min-h-screen bg-theme-primary text-theme-primary">
      <Header 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isOpen={isMobileMenuOpen}
          isHovered={isSidebarHovered}
          onAddTask={() => setIsAddModalOpen(true)}
        />
        
        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <main className={clsx(
          "flex-1 overflow-auto p-6 transition-all duration-300",
          "md:ml-20" // Always leave space for the minimized sidebar on desktop
        )}>
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Mobile Profile Section - Show first on mobile only */}
              <div className="xl:hidden">
                <ProfileSection />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Main Grid - Products Section */}
                <div className="xl:col-span-3 space-y-6">
                  {/* Controls and Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex-1 max-w-md">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-theme-secondary" />
                        <input
                          type="text"
                          placeholder="Buscar produtos..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary placeholder-theme-secondary focus:outline-none focus:border-theme-accent"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center bg-theme-secondary rounded-lg border border-theme p-1">
                        <button 
                          onClick={() => setTimeFilter('24h')}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                            timeFilter === '24h' 
                              ? 'bg-blue-500 text-white shadow-sm' 
                              : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-secondary-hover'
                          }`}
                        >
                          24H
                        </button>
                        <button 
                          onClick={() => setTimeFilter('7d')}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                            timeFilter === '7d' 
                              ? 'bg-blue-500 text-white shadow-sm' 
                              : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-secondary-hover'
                          }`}
                        >
                          7D
                        </button>
                        <button 
                          onClick={() => setTimeFilter('1m')}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                            timeFilter === '1m' 
                              ? 'bg-blue-500 text-white shadow-sm' 
                              : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-secondary-hover'
                          }`}
                        >
                          1M
                        </button>
                        <button 
                          onClick={() => setTimeFilter('1a')}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                            timeFilter === '1a' 
                              ? 'bg-blue-500 text-white shadow-sm' 
                              : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-secondary-hover'
                          }`}
                        >
                          1A
                        </button>
                        <button 
                          onClick={() => setTimeFilter('all')}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                            timeFilter === 'all' 
                              ? 'bg-blue-500 text-white shadow-sm' 
                              : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-secondary-hover'
                          }`}
                        >
                          Tudo
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Grid */}
                  <ProductGrid tasks={filteredAndSortedTasks} />

                  {/* Rank de Eficiência Table */}
                  <ProductTable 
                    tasks={filteredAndSortedTasks}
                    onSort={handleSort}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onDelete={deleteTask}
                  />

                  {/* Contribution Chart */}
                  <ContributionChart tasks={tasks} />

                  

                  {/* Metrics Dashboard */}
                  <MetricsDashboard tasks={filteredAndSortedTasks} />
                </div>

                {/* Desktop Profile Sidebar - Hidden on mobile */}
                <div className="hidden xl:block xl:col-span-1">
                  <ProfileSection />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div>
              <StatsSummary stats={stats} tasks={tasks} />
            </div>
          )}

          {activeTab === 'contact' && (
            <Contact />
          )}
        </main>
      </div>

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addTask}
      />

      <footer className="bg-theme-secondary border-t border-theme px-6 py-4 text-center text-theme-secondary text-sm">
        Repositor Portfolio © 2025 - Portfólio Profissional de Reposição
      </footer>
    </div>
  );
}
