'use client';

import { SunIcon, MoonIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { useTheme } from 'next-themes';

enum Theme {
  dark = 'dark',
  light = 'light',
}

export const DarkLightModeToggle = () => {
  if (process.env.NODE_ENV === 'production') return null;

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    theme == Theme.dark ? setTheme(Theme.light) : setTheme(Theme.dark);
  };

  return (
    <Button
      size='icon'
      className='fixed bottom-4 right-4 h-10 w-10 bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-950'
      onClick={toggleTheme}>
      <SunIcon className='h-[1.4rem] w-[1.4rem] -rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <MoonIcon className='absolute h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
};
