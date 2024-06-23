import { User2Icon } from 'lucide-react';

export default function ClientDetails() {
  return (
    <section className='mt-8'>
      <div className='flex items-end gap-2'>
        <User2Icon className='h-6 w-6 text-accent' />
        <span className='text-base font-medium leading-none'>
          Customer Details
        </span>
      </div>
      
    </section>
  );
}
