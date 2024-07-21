'use client';

import { Client } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../shared/datatable-column-header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react';

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' className='px-2' />
    ),
    cell: ({ row }) => {
      return <div className='px-4'>{row.getValue('id')}</div>;
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'gst',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='GST' />
    ),
  },
  {
    accessorKey: 'phone_1',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Mobile' />
    ),
  },
  {
    accessorKey: 'city',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='City' />
    ),
  },
  {
    accessorKey: 'last_updated',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last updated' />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0 hover:bg-secondary'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className='focus:bg-secondary'>
              <PencilIcon className='mr-2 h-4 w-4' />
              Edit client
            </DropdownMenuItem>
            <DropdownMenuItem className='text-red-500 focus:bg-secondary focus:text-red-500'>
              <Trash2Icon className='mr-2 h-4 w-4' />
              Delete client
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='focus:bg-secondary'>
              Copy GST number
            </DropdownMenuItem>
            <DropdownMenuItem className='focus:bg-secondary'>
              View invoices
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
