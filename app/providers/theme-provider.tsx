'use client';

import { Theme } from '@radix-ui/themes';
import {
  PropsWithChildren,
  createContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextProps {
  theme?: ThemeMode;
  setTheme?: (theme: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});

export const LOCAL_STORAGE_THEME_KEY = 'theme';

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_THEME_KEY)) {
      setTheme(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as ThemeMode);
    }
  }, []);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      <Theme
        appearance={theme}
        accentColor="teal"
        grayColor="olive"
        radius="full"
      >
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
}
