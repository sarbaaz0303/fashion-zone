'use client';

import { Suspense, useState } from 'react';

import LayoutHeader from '@/components/main-layout/header/header';
import SidebarHeader from '@/components/main-layout/sidebar/header';
import SidebarNavLinks from '@/components/main-layout/sidebar/sidebar';
import SidebarFooter from '@/components/main-layout/sidebar/footer';
import LayoutFooter from '@/components/main-layout/footer/footer';

import { cn } from '@/lib/utils';
import { Children } from '@/types';
import { AppData } from '@/lib/static/app-metadata';

const { short_name, name } = AppData;

export default function MainLayout({ children }: Readonly<Children>) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      <aside
        className={cn(
          'fixed left-0 top-0 z-30 hidden h-screen shrink-0 border-r border-border bg-color transition-all sm:block',
          isExpanded ? 'w-64' : 'w-20',
        )}>
        <SidebarHeader
          name={short_name}
          isExpanded={isExpanded}
          onClick={() => setIsExpanded((prev) => !prev)}
        />
        <div className={cn('h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6')}>
          <SidebarNavLinks isExpanded={isExpanded} />
        </div>
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 flex flex-col gap-2 border-t px-4 py-2',
          )}>
          <SidebarFooter isExpanded={isExpanded} />
        </div>
      </aside>
      <section
        className={cn(
          'ml-0 flex min-h-screen flex-col',
          isExpanded ? 'sm:ml-64' : 'sm:ml-20',
        )}>
        <LayoutHeader />
        <main className='grow'>{children}</main>
        <LayoutFooter name={name} />
      </section>
    </>
  );
}
