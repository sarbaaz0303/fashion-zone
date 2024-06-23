'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { Toggle } from '@/components/ui/toggle';
import { Children } from '@/types';

export default function Component({ children }: Children) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-40 h-screen shrink-0 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 ${
          isExpanded ? 'w-64' : 'w-16'
        }`}>
        <div className='flex h-16 items-center justify-between px-4'>
          <Link href='#' className='flex items-center gap-2' prefetch={false}>
            <MountainIcon className='h-6 w-6' />
            <span
              className={`text-lg font-semibold ${isExpanded ? 'block' : 'hidden'}`}>
              Acme Inc
            </span>
          </Link>
          <Button
            variant='outline'
            size='icon'
            className='lg:hidden'
            onClick={() => setIsExpanded(!isExpanded)}>
            <ChevronLeftIcon className='h-6 w-6' />
            <span className='sr-only'>Toggle navigation</span>
          </Button>
        </div>
        <div
          className={`h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6 ${isExpanded ? 'block' : 'hidden'}`}>
          <nav className='space-y-2'>
            <Link
              href='#'
              className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
              prefetch={false}>
              <HomeIcon className='h-5 w-5' />
              <span className={`${isExpanded ? 'block' : 'hidden'}`}>Home</span>
            </Link>
            <Link
              href='#'
              className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
              prefetch={false}>
              <LayoutDashboardIcon className='h-5 w-5' />
              <span className={`${isExpanded ? 'block' : 'hidden'}`}>
                Dashboard
              </span>
            </Link>
            <Collapsible className='space-y-1'>
              <CollapsibleTrigger className='flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'>
                <div className='flex items-center gap-3'>
                  <AppWindowIcon className='h-5 w-5' />
                  <span className={`${isExpanded ? 'block' : 'hidden'}`}>
                    Applications
                  </span>
                </div>
                <ChevronLeftIcon className='h-5 w-5 transition-transform group-[data-state=open]:rotate-90' />
              </CollapsibleTrigger>
              <CollapsibleContent className='space-y-1 pl-6'>
                <Link
                  href='#'
                  className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
                  prefetch={false}>
                  <InboxIcon className='h-5 w-5' />
                  <span className={`${isExpanded ? 'block' : 'hidden'}`}>
                    Inbox
                  </span>
                </Link>
                <Link
                  href='#'
                  className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
                  prefetch={false}>
                  <CalendarIcon className='h-5 w-5' />
                  <span className={`${isExpanded ? 'block' : 'hidden'}`}>
                    Calendar
                  </span>
                </Link>
                <Link
                  href='#'
                  className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
                  prefetch={false}>
                  <ContactIcon className='h-5 w-5' />
                  <span className={`${isExpanded ? 'block' : 'hidden'}`}>
                    Chat
                  </span>
                </Link>
                <Link
                  href='#'
                  className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
                  prefetch={false}>
                  <KanbanIcon className='h-5 w-5' />
                  <span className={`${isExpanded ? 'block' : 'hidden'}`}>
                    Kanban
                  </span>
                </Link>
                <Link
                  href='#'
                  className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
                  prefetch={false}>
                  <FileIcon className='h-5 w-5' />
                  <span className={`${isExpanded ? 'block' : 'hidden'}`}>
                    Files
                  </span>
                </Link>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className='space-y-1'>
              <CollapsibleTrigger className='flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'>
                <div className='flex items-center gap-3'>
                  <SettingsIcon className='h-5 w-5' />
                  <span className={`${isExpanded ? 'block' : 'hidden'}`}>
                    Settings
                  </span>
                </div>
                <ChevronLeftIcon className='h-5 w-5 transition-transform group-[data-state=open]:rotate-90' />
              </CollapsibleTrigger>
              <CollapsibleContent className='space-y-1 pl-6'>
                <Link
                  href='#'
                  className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
                  prefetch={false}>
                  <UserIcon className='h-5 w-5' />
                  <span className={`${isExpanded ? 'block' : 'hidden'}`}>
                    Profile
                  </span>
                </Link>
                <Link
                  href='#'
                  className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
                  prefetch={false}>
                  <LockIcon className='h-5 w-5' />
                  <span className={`${isExpanded ? 'block' : 'hidden'}`}>
                    Security
                  </span>
                </Link>
                <Link
                  href='#'
                  className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
                  prefetch={false}>
                  <SignalIcon className='h-5 w-5' />
                  <span className={`${isExpanded ? 'block' : 'hidden'}`}>
                    Notifications
                  </span>
                </Link>
                <Link
                  href='#'
                  className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
                  prefetch={false}>
                  <CombineIcon className='h-5 w-5' />
                  <span className={`${isExpanded ? 'block' : 'hidden'}`}>
                    Integrations
                  </span>
                </Link>
                <Link
                  href='#'
                  className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
                  prefetch={false}>
                  <ReceiptIcon className='h-5 w-5' />
                  <span className={`${isExpanded ? 'block' : 'hidden'}`}>
                    Billing
                  </span>
                </Link>
              </CollapsibleContent>
            </Collapsible>
            <Link
              href='#'
              className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
              prefetch={false}>
              <HandHelpingIcon className='h-5 w-5' />
              <span className={`${isExpanded ? 'block' : 'hidden'}`}>Help</span>
            </Link>
          </nav>
        </div>
        <div className='absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950'>
          <div className='flex items-center justify-between'>
            <Button variant='ghost' size='icon'>
              <LogOutIcon className='h-5 w-5' />
              <span className='sr-only'>Logout</span>
            </Button>
            <Toggle aria-label='Toggle dark mode'>
              <MoonIcon className='h-5 w-5' />
            </Toggle>
          </div>
        </div>
      </aside>
      <main>{children}</main>
    </>
  );
}

function AppWindowIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <rect x='2' y='4' width='20' height='16' rx='2' />
      <path d='M10 4v4' />
      <path d='M2 8h20' />
      <path d='M6 4v4' />
    </svg>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M8 2v4' />
      <path d='M16 2v4' />
      <rect width='18' height='18' x='3' y='4' rx='2' />
      <path d='M3 10h18' />
    </svg>
  );
}

function ChevronLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='m15 18-6-6 6-6' />
    </svg>
  );
}

function ChevronRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='m9 18 6-6-6-6' />
    </svg>
  );
}

function CombineIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <rect width='8' height='8' x='2' y='2' rx='2' />
      <path d='M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2' />
      <path d='M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2' />
      <path d='M10 18H5c-1.7 0-3-1.3-3-3v-1' />
      <polyline points='7 21 10 18 7 15' />
      <rect width='8' height='8' x='14' y='14' rx='2' />
    </svg>
  );
}

function ContactIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2' />
      <rect width='18' height='18' x='3' y='4' rx='2' />
      <circle cx='12' cy='10' r='2' />
      <line x1='8' x2='8' y1='2' y2='4' />
      <line x1='16' x2='16' y1='2' y2='4' />
    </svg>
  );
}

function FileIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z' />
      <path d='M14 2v4a2 2 0 0 0 2 2h4' />
    </svg>
  );
}

function HandHelpingIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14' />
      <path d='m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9' />
      <path d='m2 13 6 6' />
    </svg>
  );
}

function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
      <polyline points='9 22 9 12 15 12 15 22' />
    </svg>
  );
}

function InboxIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <polyline points='22 12 16 12 14 15 10 15 8 12 2 12' />
      <path d='M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z' />
    </svg>
  );
}

function KanbanIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M6 5v11' />
      <path d='M12 5v6' />
      <path d='M18 5v14' />
    </svg>
  );
}

function LayoutDashboardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <rect width='7' height='9' x='3' y='3' rx='1' />
      <rect width='7' height='5' x='14' y='3' rx='1' />
      <rect width='7' height='9' x='14' y='12' rx='1' />
      <rect width='7' height='5' x='3' y='16' rx='1' />
    </svg>
  );
}

function LockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <rect width='18' height='11' x='3' y='11' rx='2' ry='2' />
      <path d='M7 11V7a5 5 0 0 1 10 0v4' />
    </svg>
  );
}

function LogOutIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
      <polyline points='16 17 21 12 16 7' />
      <line x1='21' x2='9' y1='12' y2='12' />
    </svg>
  );
}

function MoonIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='m8 3 4 8 5-5 5 15H2L8 3z' />
    </svg>
  );
}

function ReceiptIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z' />
      <path d='M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8' />
      <path d='M12 17.5v-11' />
    </svg>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' />
      <circle cx='12' cy='12' r='3' />
    </svg>
  );
}

function SignalIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M2 20h.01' />
      <path d='M7 20v-4' />
      <path d='M12 20v-8' />
      <path d='M17 20V8' />
      <path d='M22 4v16' />
    </svg>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
      <circle cx='12' cy='7' r='4' />
    </svg>
  );
}
