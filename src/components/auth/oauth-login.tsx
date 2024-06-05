'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Button } from '../ui/button';
import { createClient } from '@/lib/supabase/client';

import Loading from '../shared/loading';

export default function OAuthLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();

  // Handle OAuth
  const onOAuthSignIn = async () => {
    setIsLoading(true);

    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <Button
        type='button'
        variant='outline'
        disabled={isLoading}
        className='w-full gap-x-1'
        onClick={onOAuthSignIn}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Image
              src='/svg/google.svg'
              alt='Google logo'
              width={20}
              height={20}
            />
            Continue with Google
          </>
        )}
      </Button>
    </section>
  );
}
