import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-line bg-card hover:bg-card-hover text-content transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold cursor-pointer ${className}`}
    >
      <Sun
        className={`w-5 h-5 text-amber-500 transition-all duration-300 transform ${
          isDark
            ? '-rotate-90 scale-0 opacity-0 absolute'
            : 'rotate-0 scale-100 opacity-100'
        }`}
      />
      <Moon
        className={`w-5 h-5 text-indigo-400 transition-all duration-300 transform ${
          isDark
            ? 'rotate-0 scale-100 opacity-100'
            : 'rotate-90 scale-0 opacity-0 absolute'
        }`}
      />
    </button>
  );
};

export default ThemeToggle;