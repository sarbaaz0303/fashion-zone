import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronRightCircleIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type SidebarHeaderProps = {
  name: string;
  isExpanded: boolean;
  onClick: () => void;
};

export default function SidebarHeader({
  name,
  isExpanded,
  onClick,
}: SidebarHeaderProps) {
  return (
    <div className='relative flex h-16 items-center justify-between border-b px-4'>
      <Link href='#' className='flex items-center' prefetch={false}>
        <Image
          src='/logo.svg'
          className='h-[30px] w-[30px]'
          height={34}
          width={34}
          alt={name + ' Logo'}
          title={name}
        />
        <span
          className={cn(
            'ml-2 text-2xl font-bold text-logo transition-opacity delay-150',
            isExpanded ? 'opacity-100' : 'opacity-0 delay-0 duration-0',
          )}>
          {name}
        </span>
      </Link>
      <Button
        size='icon'
        variant='outline'
        className={cn(
          'absolute -right-4 rounded-full border-0 bg-color text-gray-500 transition-transform dark:text-gray-400',
          isExpanded && 'rotate-180',
        )}
        onClick={onClick}>
        <ChevronRightCircleIcon className='h-6 w-6' />
      </Button>
    </div>
  );
}
