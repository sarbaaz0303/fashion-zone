import './globals.css';

import { Poppins as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { DarkLightModeToggle } from '@/components/development/dark-light-mode.dev';
import { TailwindIndicator } from '@/components/development/tailwind-indicator.dev';

import { AppData } from '@/static/app-metadata';
import type { Metadata } from 'next';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const { short_name: title, description, base_url } = AppData;

export const metadata: Metadata = {
  title: {
    template: `%s | ${title}`,
    default: title,
  },
  description: description,
  metadataBase: new URL(base_url),
};

export default function RootLayout({ children }: Readonly<Children>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background bg-slate-50 font-sans text-slate-950 antialiased dark:bg-slate-900 dark:text-slate-50',
          fontSans.variable,
        )}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          {children}
          <TailwindIndicator />
          <DarkLightModeToggle />
          <Toaster position='top-right' />
        </ThemeProvider>
      </body>
    </html>
  );
}
