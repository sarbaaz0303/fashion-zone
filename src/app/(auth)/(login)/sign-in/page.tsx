import AuthHeader from '@/components/auth/auth-header';
import OAuthLogin from '@/components/auth/oauth-login';
import SignInForm from '@/components/auth/sign-in-form';
import AuthFooter from '@/components/auth/auth-footer';

import { AuthType } from '@/lib/zod/auth-schema';
import { AppData } from '@/lib/static/app-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
};

const { short_name } = AppData;

export default async function SignInPage() {
  return (
    <section className='flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10'>
      <AuthHeader type={AuthType.SignIn} name={short_name} />
      <OAuthLogin />
      <section className='flex items-center'>
        <span className='flex-grow border-b'></span>
        <span className='bg-background px-4 text-sm text-gray-500 dark:text-gray-400'>
          or
        </span>
        <span className='flex-grow border-b'></span>
      </section>
      <SignInForm />
      <AuthFooter type={AuthType.SignIn} name={short_name} />
    </section>
  );
}
