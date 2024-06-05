import AuthHeader from '@/components/auth/auth-header';
import OAuthLogin from '@/components/auth/oauth-login';
import SignUpForm from '@/components/auth/sign-up-form';
import AuthFooter from '@/components/auth/auth-footer';

import { AuthType } from '@/lib/zod/auth-schema';
import { AppData } from '@/lib/static/app-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const { short_name } = AppData;

export default async function SignInPage() {
  return (
    <section className='flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10'>
      <AuthHeader type={AuthType.SignUp} name={short_name} />
      <OAuthLogin />
      <section className='flex items-center'>
        <span className='flex-grow border-b'></span>
        <span className='bg-background px-4 text-sm text-gray-500 dark:text-gray-400'>
          or
        </span>
        <span className='flex-grow border-b'></span>
      </section>
      <SignUpForm />
      <AuthFooter type={AuthType.SignUp} name={short_name} />
    </section>
  );
}
