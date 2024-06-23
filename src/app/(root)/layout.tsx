import { AppProvider } from '@/components/providers/app-provider';

import type { Children } from '@/types';

export default function RootLayout({ children }: Children) {
  return <AppProvider>{children}</AppProvider>;
}
