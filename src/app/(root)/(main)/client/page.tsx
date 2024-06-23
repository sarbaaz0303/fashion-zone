import ClientHeader from '@/components/client/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client',
};

export default function ClientPage() {
  return (
    <section>
      <ClientHeader />
    </section>
  );
}
