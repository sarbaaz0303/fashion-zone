'use client';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ButtonCloseIcon } from '@/components/button-close-icon';
import { createClient } from '@supabase/supabase-js';
export default function Home() {
  // const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  // );

  // const { data, error } = await supabase.from('countries').select();

  // console.log(data, error);

  return (
    <div className='flex justify-evenly'>
      <Button
        onClick={() => {
          const uuid = crypto.randomUUID();
          toast.success('This is a toast', {
            id: uuid,
            action: <ButtonCloseIcon toastId={uuid} />,
          });
        }}>
        Success Toast
      </Button>
      <Button
        onClick={() => {
          const uuid = crypto.randomUUID();
          toast.warning('This is a toast', {
            id: uuid,
            action: <ButtonCloseIcon toastId={uuid} />,
          });
        }}>
        Warning Toast
      </Button>
      <Button
        onClick={() => {
          const uuid = crypto.randomUUID();
          toast.info('This is a toast', {
            id: uuid,
            action: <ButtonCloseIcon toastId={uuid} />,
          });
        }}>
        Info Toast
      </Button>
      <Button
        onClick={() => {
          const uuid = crypto.randomUUID();
          toast.error('This is a toast', {
            id: uuid,
            action: <ButtonCloseIcon toastId={uuid} />,
          });
        }}>
        Error Toast
      </Button>
      <Button
        onClick={() => {
          const uuid = crypto.randomUUID();
          toast.loading('This is a toast', {
            id: uuid,
            action: <ButtonCloseIcon toastId={uuid} />,
          });
        }}>
        Loading Toast
      </Button>
    </div>
  );
}
