'use client';
import { ButtonCloseIcon } from '@/components/shared/button-close-icon';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { LogOutIcon } from 'lucide-react';
import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  deleteCookie,
  getCookie,
  setCookie,
  hasCookie,
  getCookies,
} from 'cookies-next';

// export const metadata: Metadata = {
//   title: 'Dashboard',
// };

export default function DashboardPage() {
  const supabase = createClient();
  const [user, setUser] = useState('');
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      console.log(data);
      if (data) {
        setUser(data.user?.email || '');
        if (getCookie('toast') === 'success') {
          const uuid = crypto.randomUUID();
          toast.success(data?.user?.email, {
            id: uuid,
            action: <ButtonCloseIcon toastId={uuid} />,
          });
          setCookie('toast', '', { maxAge: 0 });
        }
      }
    })();
  }, []);

  return (
    <section className='flex min-h-screen items-center justify-center'>
      <div className='flex w-[400px] items-center justify-between'>
        <Button variant={'secondary'} asChild>
          <div>{user}</div>
        </Button>
        <Button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push('/sign-in');
          }}>
          <LogOutIcon className='mr-5 h-5 w-5 rotate-180 transform' />
          Logout
        </Button>
      </div>
    </section>
  );
}
