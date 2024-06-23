import { ArchiveIcon } from 'lucide-react';

export default function ProductDetails() {
  return (
    <section className='mt-8'>
      <div className='flex items-end gap-2'>
        <ArchiveIcon className='h-6 w-6 text-accent' />
        <span className='text-base font-medium leading-none'>
          Product Details
        </span>
      </div>
    </section>
  );
}
