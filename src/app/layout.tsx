import './globals.css';

import { Poppins as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ModeToggle } from '@/components/theme-switcher.dev';
import { TailwindIndicator } from '@/components/tailwind-indicator.dev';

import { data } from '@/static-app-data/data';
import type { Metadata } from 'next';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const { short_name: title, description, base_url } = data;

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
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          {children}
          <ModeToggle />
          <TailwindIndicator />
          <Toaster position='top-right' />
        </ThemeProvider>
      </body>
    </html>
  );
}
