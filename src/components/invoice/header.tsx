import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { PlusIcon } from 'lucide-react';

export default function InvoiceHeader() {
  return (
    <Card className='m-4'>
      <CardHeader className='flex-row justify-between items-center p-4'>
        <CardTitle>Invoices</CardTitle>
        <Button asChild>
          <Link href='/invoice/create' className='gap-2'>
            <PlusIcon className=' h-6 w-6' />
            Create Invoice
          </Link>
        </Button>
      </CardHeader>
    </Card>
  );
}
