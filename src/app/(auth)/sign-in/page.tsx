import AuthForm from '@/components/auth-form';
import { AuthType } from '@/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default async function SignInPage() {
  return (
    <section className='flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10'>
      <AuthForm type={AuthType.SignIn} />
    </section>
  );
}
