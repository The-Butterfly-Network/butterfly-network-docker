import { useEffect } from 'react';

const useTheme = () => {
  // Theme is now always 'dark'
  const theme = 'dark';

  useEffect(() => {
    // Always apply dark theme
    document.documentElement.classList.add('dark');
    
    // Store dark theme in localStorage
    localStorage.setItem('theme', 'dark');
    
    // Dispatch a custom event to notify theme change
    const event = new CustomEvent('themeChanged', { detail: { theme: 'dark' } });
    document.dispatchEvent(event);
  }, []);

  // Return a dummy toggle function that doesn't do anything
  const toggleTheme = () => {
    // No operation - dark mode is permanent
  };

  return [theme, toggleTheme];
};

export default useTheme;