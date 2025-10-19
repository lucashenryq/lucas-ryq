import { BarChart3, Package, Mail, Plus } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  activeTab: 'dashboard' | 'stats' | 'contact';
  onTabChange: (tab: 'dashboard' | 'stats' | 'contact') => void;
  isOpen: boolean; // For mobile menu
  isHovered: boolean; // For desktop hover behavior
  onAddTask: () => void;
}

export default function Sidebar({ activeTab, onTabChange, isOpen, isHovered, onAddTask }: SidebarProps) {
  const menuItems = [
    {
      id: 'dashboard' as const,
      label: 'Dashboard',
      icon: Package
    },
    {
      id: 'stats' as const,
      label: 'Estatísticas',
      icon: BarChart3
    },
    {
      id: 'contact' as const,
      label: 'Contato',
      icon: Mail
    }
  ];

  return (
    <>
      {/* Desktop sidebar - single menu that expands on hover */}
      <aside className={clsx(
        'fixed left-0 top-16 bottom-0 bg-theme-secondary border-r border-theme z-50 transition-all duration-300 ease-in-out hidden md:block',
        isHovered ? 'w-64' : 'w-20'
      )}>
        <nav className="p-4 space-y-2">
          {/* Add Task Button */}
          <button
            onClick={onAddTask}
            className="w-full flex items-center rounded-lg transition-all duration-300 h-12 px-3 bg-theme-accent text-theme-accent-text hover:bg-theme-accent-hover shadow-lg group relative overflow-hidden"
            title={!isHovered ? "Adicionar Tarefa" : undefined}
          >
            <Plus className="w-5 h-5 flex-shrink-0" />
            <span className={clsx(
              'font-medium whitespace-nowrap transition-all duration-300 ml-3',
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
            )}>
              Adicionar Tarefa
            </span>
          </button>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={clsx(
                  'w-full flex items-center rounded-lg transition-all duration-300 h-12 px-3 relative overflow-hidden',
                  isActive
                    ? 'bg-theme-accent text-theme-accent-text shadow-lg'
                    : 'text-theme-secondary hover:bg-theme-secondary-hover hover:text-theme-primary hover:shadow-md'
                )}
                title={!isHovered ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className={clsx(
                  'font-medium whitespace-nowrap transition-all duration-300 ml-3',
                  isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <aside className="fixed inset-y-0 left-0 w-64 bg-theme-secondary border-r border-theme h-full z-50 transition-all duration-300 ease-in-out md:hidden">
          <nav className="p-4 space-y-2 mt-16">
            {/* Add Task Button */}
            <button
              onClick={onAddTask}
              className="w-full flex items-center rounded-lg transition-all duration-300 h-12 px-3 space-x-3 justify-start bg-theme-accent text-theme-accent-text hover:bg-theme-accent-hover shadow-lg"
            >
              <Plus className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium whitespace-nowrap">
                Adicionar Tarefa
              </span>
            </button>

            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={clsx(
                    'w-full flex items-center rounded-lg transition-all duration-300',
                    'h-12 px-3 space-x-3 justify-start',
                    activeTab === item.id
                      ? 'bg-theme-accent text-theme-accent-text shadow-lg'
                      : 'text-theme-secondary hover:bg-theme-secondary-hover hover:text-theme-primary hover:shadow-md'
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>
      )}
    </>
  );
}
