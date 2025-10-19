import { Palette, Sun, Moon } from 'lucide-react';
import { useTheme, Theme } from '@/react-app/hooks/useTheme';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function ThemeToggle() {
  const { theme, changeTheme, getThemeName } = useTheme();

  const themes: { key: Theme; label: string; icon: React.ReactNode; description: string }[] = [
    {
      key: 'dark',
      label: 'Escuro',
      icon: <Moon className="w-4 h-4" />,
      description: 'Tema escuro clássico'
    },
    {
      key: 'light',
      label: 'Claro',
      icon: <Sun className="w-4 h-4" />,
      description: 'Tema claro e limpo'
    }
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg bg-theme-secondary hover:bg-theme-secondary-hover text-theme-text-primary transition-colors">
          <Palette className="w-4 h-4" />
          <span className="hidden sm:inline">{getThemeName(theme)}</span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-theme-border rounded-md bg-theme-secondary border border-theme-border shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="px-1 py-1">
            <div className="px-3 py-2 text-xs font-semibold text-theme-text-secondary uppercase tracking-wide">
              Escolher Tema
            </div>
          </div>
          <div className="px-1 py-1">
            {themes.map((themeOption) => (
              <Menu.Item key={themeOption.key}>
                {({ active }) => (
                  <button
                    onClick={() => changeTheme(themeOption.key)}
                    className={`${
                      active ? 'bg-theme-accent text-theme-accent-text' : 'text-theme-text-primary'
                    } ${
                      theme === themeOption.key ? 'bg-theme-accent/20' : ''
                    } group flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors`}
                  >
                    <div className="mr-3 flex-shrink-0">
                      {themeOption.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{themeOption.label}</div>
                      <div className="text-xs text-theme-text-secondary">
                        {themeOption.description}
                      </div>
                    </div>
                    {theme === themeOption.key && (
                      <div className="ml-2 h-2 w-2 bg-theme-accent rounded-full"></div>
                    )}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
