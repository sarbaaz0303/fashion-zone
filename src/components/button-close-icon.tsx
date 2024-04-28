'use client';

import { XIcon as CloseIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';

type ButtonCloseProps = { toastId: string };

export function ButtonCloseIcon({ toastId }: ButtonCloseProps) {
  return (
    <Button
      variant='outline'
      size='icon'
      onClick={() => toast.dismiss(toastId)}
      className='absolute right-2 border-none bg-transparent outline-none hover:bg-transparent'>
      <span className='sr-only'>Dismiss</span>
      <CloseIcon className='h-5 w-5 text-gray-700 dark:text-gray-300' />
    </Button>
  );
}
