'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

import { LogOutIcon, MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { Children } from '@/types';
import { useEffect, useState } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

enum Theme {
  dark = 'dark',
  light = 'light',
  system = 'system',
}

type SidebarFooter = {
  isExpanded: boolean;
};

export default function SidebarFooter({ isExpanded }: SidebarFooter) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [activeTheme, setActiveTheme] = useState<string | undefined>(undefined);

  useEffect(() => {
    setActiveTheme(theme);
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();
    router.push('/sign-in');
  };

  return (
    <div className='flex flex-col justify-center gap-2'>
      <div
        className={cn(
          'sidebar-link flex h-10 items-center',
          isExpanded && 'pl-2',
        )}>
        <div className='rounded-full border transition-all'>
          {isExpanded ? (
            <>
              <ThemeButton
                theme={theme}
                currentTheme={Theme.system}
                setCurrentTheme={setTheme}>
                <MonitorIcon className='h-5 w-5 dark:text-gray-400' />
              </ThemeButton>
              <ThemeButton
                theme={theme}
                currentTheme={Theme.light}
                setCurrentTheme={setTheme}>
                <SunIcon className='h-5 w-5 dark:text-gray-400' />
              </ThemeButton>
              <ThemeButton
                theme={theme}
                currentTheme={Theme.dark}
                setCurrentTheme={setTheme}>
                <MoonIcon className='h-5 w-5 dark:text-gray-400' />
              </ThemeButton>
            </>
          ) : (
            <HoverCard>
              <HoverCardTrigger>
                {theme === Theme.light ? (
                  <ThemeButton
                    theme={theme}
                    currentTheme={Theme.dark}
                    setCurrentTheme={setTheme}>
                    <MoonIcon className='h-5 w-5 dark:text-gray-400' />
                  </ThemeButton>
                ) : theme === Theme.dark ? (
                  <ThemeButton
                    theme={theme}
                    currentTheme={Theme.light}
                    setCurrentTheme={setTheme}>
                    <SunIcon className='h-5 w-5 dark:text-gray-400' />
                  </ThemeButton>
                ) : (
                  <ThemeButton
                    theme={theme}
                    currentTheme={Theme.system}
                    setCurrentTheme={setTheme}>
                    <MonitorIcon className='h-5 w-5 dark:text-gray-400' />
                  </ThemeButton>
                )}
              </HoverCardTrigger>
              <HoverCardContent
                align='start'
                className='sidebar-link flex w-auto items-center px-4 py-2'>
                <div className='rounded-full border transition-all'>
                  <ThemeButton
                    theme={theme}
                    currentTheme={Theme.system}
                    setCurrentTheme={setTheme}>
                    <MonitorIcon className='h-5 w-5 dark:text-gray-400' />
                  </ThemeButton>
                  <ThemeButton
                    theme={theme}
                    currentTheme={Theme.light}
                    setCurrentTheme={setTheme}>
                    <SunIcon className='h-5 w-5 dark:text-gray-400' />
                  </ThemeButton>
                  <ThemeButton
                    theme={theme}
                    currentTheme={Theme.dark}
                    setCurrentTheme={setTheme}>
                    <MoonIcon className='h-5 w-5 dark:text-gray-400' />
                  </ThemeButton>
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
      </div>
      <div className='sidebar-link h-10 w-full rounded-md px-3 transition hover:bg-secondary'>
        <Button
          variant='ghost'
          className='px-0 hover:bg-transparent'
          onClick={handleLogout}>
          <LogOutIcon className='mr-4 h-5 w-5' />
          {isExpanded && 'Logout'}
        </Button>
      </div>
    </div>
  );
}

type ThemeButtonProps = {
  theme: string | undefined;
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
} & Children;

export function ThemeButton({
  theme,
  currentTheme,
  setCurrentTheme,
  children,
}: ThemeButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            suppressHydrationWarning
            variant='ghost'
            onClick={() => setCurrentTheme(currentTheme)}
            className={cn(
              'h-10 w-10 p-1 transition-none hover:rounded-full hover:bg-secondary',
              theme === currentTheme && 'rounded-full bg-secondary',
            )}>
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent align='start'>
          <p className='max-w-prose text-sm font-normal text-gray-500 dark:text-gray-400'>
            {currentTheme}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
