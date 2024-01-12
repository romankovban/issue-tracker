'use client';

import { Button } from '@radix-ui/themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

interface ThemeSwitch {
  theme: string;
  toggleTheme: () => void;
}
export const ThemeSwitch = ({ theme, toggleTheme }: ThemeSwitch) => {
  return (
    <Button
      className="!p-1.5 !cursor-pointer"
      radius="full"
      variant="ghost"
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        <MoonIcon width={24} height={24} />
      ) : (
        <SunIcon width={24} height={24} />
      )}
    </Button>
  );
};
