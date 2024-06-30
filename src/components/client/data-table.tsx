'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Card } from '../ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { ArrowUpDownIcon, MoreHorizontalIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { DataTablePagination } from '../shared/data-table-pagination';
import { DataTableViewOptions } from '../shared/data-table-column-toggle';
import { DataTableColumnHeader } from '../shared/datatable-column-header';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed' | 'completed';
  email: string;
};

export const payments: Payment[] = [
  {
    id: '728ed52f',
    amount: 10010,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125000,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: '36a9d82a',
    amount: 32050,
    status: 'completed',
    email: 'user1@example.com',
  },
  {
    id: '8742b56e',
    amount: 50700,
    status: 'pending',
    email: 'user2@example.com',
  },
  {
    id: '65b3e48f',
    amount: 9600,
    status: 'processing',
    email: 'user3@example.com',
  },
  {
    id: '298b41cf',
    amount: 48200,
    status: 'completed',
    email: 'user4@example.com',
  },
  {
    id: '9a6e8d23',
    amount: 107500,
    status: 'pending',
    email: 'user5@example.com',
  },
  {
    id: '4b7d38a9',
    amount: 21500,
    status: 'processing',
    email: 'user6@example.com',
  },
  {
    id: '8a9c54ef',
    amount: 76500,
    status: 'completed',
    email: 'user7@example.com',
  },
  {
    id: '3c6d74ba',
    amount: 22000,
    status: 'pending',
    email: 'user8@example.com',
  },
  {
    id: '579c82ed',
    amount: 98000,
    status: 'processing',
    email: 'user9@example.com',
  },
  {
    id: '6b3f29c7',
    amount: 15200,
    status: 'completed',
    email: 'user10@example.com',
  },
  {
    id: '87d4e52a',
    amount: 62000,
    status: 'pending',
    email: 'user11@example.com',
  },
  {
    id: '49e8b5f1',
    amount: 33000,
    status: 'processing',
    email: 'user12@example.com',
  },
  {
    id: '7a4e29d6',
    amount: 78000,
    status: 'completed',
    email: 'user13@example.com',
  },
  {
    id: '2c5d74bf',
    amount: 54000,
    status: 'pending',
    email: 'user14@example.com',
  },
  {
    id: '36e5a48a',
    amount: 29500,
    status: 'processing',
    email: 'user15@example.com',
  },
  {
    id: '95a4d1e2',
    amount: 103000,
    status: 'completed',
    email: 'user16@example.com',
  },
  {
    id: '5d8e29f4',
    amount: 49000,
    status: 'pending',
    email: 'user17@example.com',
  },
  {
    id: '8b2c53e7',
    amount: 67500,
    status: 'processing',
    email: 'user18@example.com',
  },
  {
    id: '3a7d92cf',
    amount: 83000,
    status: 'completed',
    email: 'user19@example.com',
  },
  {
    id: '67b5d4e1',
    amount: 42000,
    status: 'pending',
    email: 'user20@example.com',
  },
  {
    id: '49d1b28f',
    amount: 57000,
    status: 'processing',
    email: 'user21@example.com',
  },
  {
    id: '6e2d8b3a',
    amount: 26000,
    status: 'completed',
    email: 'user22@example.com',
  },
  {
    id: '2a6e73c1',
    amount: 99000,
    status: 'pending',
    email: 'user23@example.com',
  },
  {
    id: '8b7f14e5',
    amount: 48500,
    status: 'processing',
    email: 'user24@example.com',
  },
  {
    id: '4d8e29f3',
    amount: 33000,
    status: 'completed',
    email: 'user25@example.com',
  },
  {
    id: '3c7f92d8',
    amount: 51000,
    status: 'pending',
    email: 'user26@example.com',
  },
  {
    id: '6b3e29d4',
    amount: 71500,
    status: 'processing',
    email: 'user27@example.com',
  },
  {
    id: '2d8e41f9',
    amount: 49000,
    status: 'completed',
    email: 'user28@example.com',
  },
  {
    id: '7a9d52b2',
    amount: 84000,
    status: 'pending',
    email: 'user29@example.com',
  },
  {
    id: '3e6d49a5',
    amount: 29500,
    status: 'processing',
    email: 'user30@example.com',
  },
  {
    id: '6c7b31f7',
    amount: 108500,
    status: 'completed',
    email: 'user31@example.com',
  },
  {
    id: '4d8c52a8',
    amount: 64000,
    status: 'pending',
    email: 'user32@example.com',
  },
  {
    id: '2b7e49c3',
    amount: 45000,
    status: 'processing',
    email: 'user33@example.com',
  },
  {
    id: '8c7d92b9',
    amount: 52000,
    status: 'completed',
    email: 'user34@example.com',
  },
  {
    id: '3f6e29a7',
    amount: 71000,
    status: 'pending',
    email: 'user35@example.com',
  },
  {
    id: '6d7b51c4',
    amount: 37000,
    status: 'processing',
    email: 'user36@example.com',
  },
  {
    id: '4a8e23b5',
    amount: 102500,
    status: 'completed',
    email: 'user37@example.com',
  },
  {
    id: '3c6f92e3',
    amount: 62000,
    status: 'pending',
    email: 'user38@example.com',
  },
  {
    id: '2d7b31a9',
    amount: 45000,
    status: 'processing',
    email: 'user39@example.com',
  },
  {
    id: '6e8d52b7',
    amount: 57000,
    status: 'completed',
    email: 'user40@example.com',
  },
  {
    id: '4b8e29c2',
    amount: 92000,
    status: 'pending',
    email: 'user41@example.com',
  },
  {
    id: '2e6f73d4',
    amount: 30500,
    status: 'processing',
    email: 'user42@example.com',
  },
  {
    id: '8d7c41e5',
    amount: 115000,
    status: 'completed',
    email: 'user43@example.com',
  },
  {
    id: '3f8e52b6',
    amount: 51000,
    status: 'pending',
    email: 'user44@example.com',
  },
  {
    id: '6d9b31c7',
    amount: 67000,
    status: 'processing',
    email: 'user45@example.com',
  },
  {
    id: '2c6d49b8',
    amount: 39000,
    status: 'completed',
    email: 'user46@example.com',
  },
  {
    id: '4e8c52d9',
    amount: 82000,
    status: 'pending',
    email: 'user47@example.com',
  },
  {
    id: '3d7e29e2',
    amount: 34000,
    status: 'processing',
    email: 'user48@example.com',
  },
  {
    id: '6c8d41b3',
    amount: 123000,
    status: 'completed',
    email: 'user49@example.com',
  },
  {
    id: '4a7f52c4',
    amount: 54000,
    status: 'pending',
    email: 'user50@example.com',
  },
  {
    id: '2e8d31a5',
    amount: 79000,
    status: 'processing',
    email: 'user51@example.com',
  },
];

export const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <ArrowUpDownIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: () => <div className='text-right'>Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-IN', {}).format(amount);

      return <div className='text-right font-medium'>{formatted}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  console.log('rowSelection', rowSelection);
  console.log('columnVisibility', columnVisibility);
  console.log('columnFilters', columnFilters);
  console.log('sorting', sorting);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter emails...'
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <DataTableViewOptions table={table} />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}

export default function ClientDataTable() {
  return (
    <Card className='m-4'>
      <DataTable columns={columns} data={payments} />
    </Card>
  );
}
