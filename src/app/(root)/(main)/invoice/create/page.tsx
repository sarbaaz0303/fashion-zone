import ClientDetails from '@/components/invoice-create/client-details';
import ProductDetails from '@/components/invoice-create/product-detials';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function InvoiceCreatePage() {
  return (
    <Card className='m-4'>
      <CardHeader className='flex flex-row'>
        <Button variant='link' className='text-subtitle' asChild>
          <Link href='/'>
            <ArrowLeftIcon className='mr-2 h-6 w-6' />
            <span className='sr-only'>Back</span>
          </Link>
        </Button>
        <CardTitle>Create Invoice</CardTitle>
      </CardHeader>
      <CardContent>
        <ClientDetails />
        <ProductDetails />
      </CardContent>
    </Card>
  );
}
