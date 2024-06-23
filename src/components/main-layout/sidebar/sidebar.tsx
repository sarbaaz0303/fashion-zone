'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

import {
  ChevronRightIcon,
  CreditCardIcon,
  FileTextIcon,
  HomeIcon,
  LucideIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PopoverContent } from '@radix-ui/react-popover';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type NavbarLinkProps = {
  href: string;
  name: string;
  icon: LucideIcon;
  isExpanded: boolean;
  active: boolean;
};

function NavbarLink({ href, name, icon, isExpanded, active }: NavbarLinkProps) {
  const Icon = icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'sidebar-link h-10 w-full rounded-md px-3 transition hover:bg-secondary',
              active && 'bg-secondary',
            )}>
            <Button
              variant='ghost'
              className='px-0 hover:bg-transparent'
              asChild>
              <Link href={href} className={'gap-3'} prefetch={false}>
                <Icon className='h-5 w-5' />
                {isExpanded && name}
              </Link>
            </Button>
          </div>
        </TooltipTrigger>
        {!isExpanded && (
          <TooltipContent align='start'>
            <p className='max-w-prose text-sm font-normal text-gray-500 dark:text-gray-400'>
              {name}
            </p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

type SidebarNavLinksProps = {
  isExpanded: boolean;
};

export default function SidebarNavLinks({ isExpanded }: SidebarNavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className='space-y-2'>
      <NavbarLink
        href='/dashboard'
        name='Dashboard'
        icon={HomeIcon}
        isExpanded={isExpanded}
        active={pathname === '/dashboard'}
      />
      <NavbarLink
        href='/invoice'
        name='Invoice'
        icon={FileTextIcon}
        isExpanded={isExpanded}
        active={pathname === '/invoice'}
      />
      <NavbarLink
        href='#'
        name='Payments'
        icon={CreditCardIcon}
        isExpanded={isExpanded}
        active={pathname === '#'}
      />
      <NavbarLink
        href='/client'
        name='Clients'
        icon={UserIcon}
        isExpanded={isExpanded}
        active={pathname === '/client'}
      />
      {isExpanded ? (
        <Collapsible className='space-y-1'>
          <div className='sidebar-link h-10 w-full rounded-md px-3 transition hover:bg-secondary'>
            <Button
              variant='ghost'
              className='px-0 hover:bg-transparent'
              asChild>
              <CollapsibleTrigger className='group w-full justify-between'>
                <div className='flex items-center gap-3'>
                  <SettingsIcon className='h-5 w-5' />
                  {isExpanded && 'Settings'}
                </div>
                {isExpanded && (
                  <ChevronRightIcon className='h-5 w-5 transition-transform group-data-[state=open]:rotate-90' />
                )}
              </CollapsibleTrigger>
            </Button>
          </div>
          <CollapsibleContent className='space-y-1 pl-6'>
            {isExpanded ? (
              <NavbarLink
                href='#'
                name='Profile'
                icon={UserIcon}
                isExpanded={isExpanded}
                active={pathname === '#'}
              />
            ) : null}
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <Popover>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <div className='sidebar-link h-10 w-full rounded-md px-3 transition hover:bg-secondary'>
                    <Button
                      variant='ghost'
                      className='px-0 hover:bg-transparent'>
                      <SettingsIcon className='h-5 w-5' />
                    </Button>
                  </div>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent align='start'>
                <p className='max-w-prose text-sm font-normal text-gray-500 dark:text-gray-400'>
                  Click to expand Settings
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <PopoverContent
            align='start'
            className='rounded-md border bg-color px-4 py-2'>
            <NavbarLink
              href='#'
              name='Profile'
              icon={UserIcon}
              isExpanded={true}
              active={pathname === '#'}
            />
          </PopoverContent>
        </Popover>
      )}
    </nav>
  );
}
