import SignInForm from '@/components/auth/signin-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default async function SignInPage() {
  return (
    <section className='md:gap-8; flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10'>
      <SignInForm />
    </section>
  );
}
