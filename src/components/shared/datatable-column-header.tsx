import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDownIcon,
  EyeOffIcon,
} from 'lucide-react';
import { Column } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '../ui/context-menu';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Button
            variant='ghost'
            className='hover:bg-secondary'
            onClick={() => column.toggleSorting()}>
            {title}
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className='ml-2 h-4 w-4' />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className='ml-2 h-4 w-4' />
            ) : (
              <ChevronsUpDownIcon className='ml-2 h-4 w-4' />
            )}
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent className='[&>div]:p-0'>
          <ContextMenuItem className='pb-1'>
            <Button
              variant='ghost'
              className='h-6 w-full justify-start py-0 font-normal hover:bg-secondary'
              onClick={() => column.toggleSorting(false)}>
              <ArrowUpIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
              Asc
            </Button>
          </ContextMenuItem>
          <ContextMenuItem className='pb-1'>
            <Button
              variant='ghost'
              className='h-6 w-full justify-start py-0 font-normal hover:bg-secondary'
              onClick={() => column.toggleSorting(true)}>
              <ArrowDownIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
              Desc
            </Button>
          </ContextMenuItem>
          {typeof column.accessorFn !== 'undefined' && column.getCanHide() && (
            <>
              <ContextMenuSeparator />
              <ContextMenuItem className='pb-1'>
                <Button
                  variant='ghost'
                  className='h-6 w-full justify-start py-0 font-normal hover:bg-secondary'
                  onClick={() => column.toggleVisibility(false)}>
                  <EyeOffIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                  Hide
                </Button>
              </ContextMenuItem>
            </>
          )}
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
