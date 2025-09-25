import React from 'react';
import { Button } from '@/components/ui/button';
import useTheme from '@/hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="sm"
      className="relative overflow-hidden transition-all duration-300 hover:scale-105"
    >
      <div className="flex items-center gap-2">
        {theme === 'dark' ? (
          <>
            <span className="text-sm">🌙</span>
            <span className="text-xs font-medium">Dark</span>
          </>
        ) : (
          <>
            <span className="text-sm">🌸</span>
            <span className="text-xs font-medium">Pink</span>
          </>
        )}
      </div>
      <div className={`absolute inset-0 opacity-10 transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-gradient-to-r from-green-400 to-green-600' 
          : 'bg-gradient-to-r from-pink-300 to-pink-500'
      }`} />
    </Button>
  );
};

export default ThemeToggle;