import InvoiceHeader from '@/components/invoice/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoice',
};

export default async function InvoicePage() {
  return (
    <section>
      <InvoiceHeader />
    </section>
  );
}
