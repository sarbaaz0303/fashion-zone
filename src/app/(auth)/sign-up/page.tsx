import AuthForm from '@/components/auth-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default async function SignUpPage() {
  return (
    <section className='md:gap-8; flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10'>
      <AuthForm type='sign-up' />
    </section>
  );
}
