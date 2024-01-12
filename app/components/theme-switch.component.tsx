'use client';

import { Button } from '@radix-ui/themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from '@/app/hooks/use-theme';

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      className="!p-1.5"
      radius="full"
      variant="ghost"
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        <MoonIcon className="cursor-pointer" width={24} height={24} />
      ) : (
        <SunIcon className="cursor-pointer" width={24} height={24} />
      )}
    </Button>
  );
};
