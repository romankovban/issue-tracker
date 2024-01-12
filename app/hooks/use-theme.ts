'use client';

import { useContext } from 'react';
import {
  LOCAL_STORAGE_THEME_KEY,
  ThemeContext,
  ThemeMode,
} from '@/app/providers/theme-provider';

interface UseThemeResult {
  theme: ThemeMode;
  toggleTheme: () => void;
}

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    if (setTheme) {
      setTheme(newTheme);
    }

    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return {
    theme: theme || 'dark',
    toggleTheme,
  };
};
