'use client';

import { toast } from 'sonner';
import { Button } from './ui/button';
import { ButtonCloseIcon } from './shared/button-close-icon';

export default function CustomToast() {
  return (
    <div className='flex justify-evenly '>
      <Button
        onClick={() => {
          const uuid = crypto.randomUUID();
          toast.success(' This is a toast This is a toast This is a toast This is aThis is a toast This is a toast This is a toast This is a toast', {
            id: uuid,
            action: <ButtonCloseIcon toastId={uuid} />,
            duration: 50000,
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
