import CustomToast from '@/components/custom-toast';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoice',
};

export default async function InvoicePage() {
  return (
    <div>
      <CustomToast />
    </div>
  );
}
