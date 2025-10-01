import React from 'react';
import { 
  Home, 
  Users, 
  FolderOpen, 
  Trello,
  FileText, 
  Settings,
  HelpCircle,
  Moon,
  Sun
} from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from '../../contexts/ThemeContext';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'interns', name: 'Interns', icon: Users },
  { id: 'projects', name: 'Projects', icon: FolderOpen },
  { id: 'kanban', name: 'Kanban', icon: Trello },
  { id: 'reports', name: 'Reports', icon: FileText },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-900 h-screen shadow-sm border-r border-gray-100 dark:border-gray-800 fixed left-0 top-0 z-30 overflow-y-auto w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0">
      {/* Logo */}
      <div className="flex items-center px-6 py-6 border-b border-gray-100 dark:border-gray-800">
        <div className="bg-blue-600 rounded-lg p-2 mr-3">
          <Users className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">InternHub</h1>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={clsx(
                  'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-r-2 border-blue-600'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                )}
              >
                <Icon className={clsx(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
                )} />
                {item.name}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Theme Toggle */}
      <div className="mt-6 px-3">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
        >
          {isDark ? <Sun className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-500" /> : <Moon className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-500" />}
          {isDark ? 'Mode Clair' : 'Mode Sombre'}
        </button>
      </div>

      {/* Help Section */}
      <div className="mt-8 mb-6 mx-3">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex items-start">
            <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">Besoin d'aide?</h3>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                Consultez notre documentation.
              </p>
              <button 
                onClick={() => alert('Documentation bientôt disponible!')}
                className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer"
              >
                En savoir plus →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}