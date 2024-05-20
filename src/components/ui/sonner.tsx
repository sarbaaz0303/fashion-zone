'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';
import CircleCheckIcon from '@/assets/tsx-svg/circle-check';
import CircleAlertIcon from '@/assets/tsx-svg/circle-alert';
import CircleInfoIcon from '@/assets/tsx-svg/circle-info';
import TriangleAlertIcon from '@/assets/tsx-svg/triangle-alert';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      toastOptions={{
        duration: 3000,
        classNames: {
          toast:
            '[&>div:nth-child(2)]:w-5/6	group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-0 group-[.toaster]:shadow-lg group-[.toaster]:border-l-4 dark:group-[.toaster]:bg-gray-800',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          success: 'group-[.toaster]:border-green-300',
          info: 'group-[.toaster]:border-blue-300',
          warning: 'group-[.toaster]:border-amber-300',
          error: 'group-[.toaster]:border-red-300',
          loading: 'group-[.toaster]:border-gray-300',
        },
      }}
      icons={{
        success: <CircleCheckIcon className='text-green-500' />,
        info: <CircleInfoIcon className='text-blue-500' />,
        warning: <TriangleAlertIcon className='text-amber-400' />,
        error: <CircleAlertIcon className='text-red-500' />,
      }}
      {...props}
    />
  );
};

export { Toaster };
