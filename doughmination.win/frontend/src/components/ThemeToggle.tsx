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
      className="relative overflow-hidden transition-all duration-300 hover:scale-105 font-comic"
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
            <span className="text-xs font-medium">Light</span>
          </>
        )}
      </div>
    </Button>
  );
};

export default ThemeToggle;