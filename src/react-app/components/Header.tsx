import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export default function Header({ onMenuToggle, isMobileMenuOpen }: HeaderProps) {
  return (
    <header className="bg-theme-secondary border-b border-theme px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-lg hover:bg-theme-secondary-hover transition-colors text-theme-primary"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
        <div>
          <h1 className="text-xl font-bold text-theme-primary">
            Repositor Portfolio
          </h1>
          <p className="text-sm text-theme-secondary">
            Portfólio Profissional de Reposição
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <ThemeToggle />
      </div>
    </header>
  );
}
