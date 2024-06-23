'use client';
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { useApp } from '../providers/app-provider';
import { Calendar } from '../ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Popover } from '../ui/popover';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { useState } from 'react';
import Link from 'next/link';

export default function WelcomeTile() {
  const { state } = useApp() || {};
  const { user } = state || {};

  const [date, setDate] = useState(new Date());

  return (
    <Card className='m-4 grid grid-cols-1 sm:grid-cols-2'>
      <CardHeader>
        <CardTitle>Welcome Back, {user?.first_name}</CardTitle>
        <CardDescription className='leading-6'>
          We have summarized your financial activity information
        </CardDescription>
      </CardHeader>
      <CardContent className='flex items-center  justify-evenly space-x-2'>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='ghost' className='gap-2 hover:bg-secondary'>
              <ChevronLeftIcon className='text-subtitle' />
              <span className='text-sm font-normal'>
                {format(date, 'MMM yyyy')}
              </span>
              <ChevronRightIcon className='text-subtitle' />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar className='rounded-md bg-color' onDayClick={setDate} />
          </PopoverContent>
        </Popover>
        <Button asChild>
          <Link href='/invoice/create' className='gap-2'>
            <PlusIcon className=' h-6 w-6' />
            Create Invoice
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
