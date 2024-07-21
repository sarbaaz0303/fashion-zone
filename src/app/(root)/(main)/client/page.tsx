import { Card } from '@/components/ui/card';

import ClientHeader from '@/components/client/header';
import { columns } from '@/components/client/columns';
import { DataTable } from '@/components/client/data-table';

import type { Metadata } from 'next';
import { clients } from '@/database/dummy-data';

export const metadata: Metadata = {
  title: 'Client',
};

export default function ClientPage() {
  return (
    <section>
      <ClientHeader />
      <Card className='m-4'>
        <DataTable columns={columns} data={clients} />
      </Card>
    </section>
  );
}
