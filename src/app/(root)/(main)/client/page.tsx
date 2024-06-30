import ClientHeader from '@/components/client/header';
import ClientDataTable from '@/components/client/data-table';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client',
};

export default function ClientPage() {
  return (
    <section>
      <ClientHeader />
      <ClientDataTable />
    </section>
  );
}
