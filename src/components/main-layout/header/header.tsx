'use client';

import { useApp } from '@/components/providers/app-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { BellIcon, ChevronDownIcon, MenuIcon, SearchIcon } from 'lucide-react';
import SidebarHeader from '../sidebar/header';
import { AppData } from '@/lib/static/app-metadata';
import SidebarNavLinks from '../sidebar/sidebar';
import { cn } from '@/lib/utils';
import SidebarFooter from '../sidebar/footer';

const { short_name, name } = AppData;

type LayoutHeaderProps = {};

export default function LayoutHeader({}: LayoutHeaderProps) {
  const { state } = useApp() || {};
  const { user } = state || {};

  const fallbackData = ((data) => {
    if (data?.first_name && data?.last_name) {
      return [
        data.first_name[0] + data.last_name[0],
        data.first_name + ' ' + data.last_name,
      ];
    }
    return ['A', 'Anonymous'];
  })(user);

  return (
    <header className='flex h-16 items-center justify-center gap-4 border-b bg-color px-4 sm:px-8 md:gap-6'>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className='relative block px-2 sm:hidden'
            variant='outline'
            size={'icon'}>
            <MenuIcon />
            <span className='sr-only'>Navigation Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'></SheetContent>
      </Sheet>
      <Input
        className='bg-color'
        startIcon={SearchIcon}
        placeholder='Search...'
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button className='relative px-2' variant='outline' size={'icon'}>
            {/* <div className='absolute right-0 top-0 h-3 w-3 rounded-full bg-red-500'></div> */}
            <BellIcon />
            <span className='sr-only'>Notifications</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align='end'></PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger>
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src={user?.profile_picture} />
              <AvatarFallback>{fallbackData[0]}</AvatarFallback>
            </Avatar>
            <span className=' hidden w-max text-sm sm:block'>
              {fallbackData[1]}
            </span>
            <ChevronDownIcon className='hidden h-4 w-4 sm:block' />
          </div>
        </PopoverTrigger>
        <PopoverContent align='end'></PopoverContent>
      </Popover>
    </header>
  );
}
