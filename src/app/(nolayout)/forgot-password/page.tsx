import ForgotPassword from '@/components/forgot-password';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

type search = {
  searchParams: {
    email: string;
  };
};

export default async function ForgotPasswordPage({ searchParams }: search) {
  return (
    <section className='grid min-h-screen w-full place-items-center'>
      <ForgotPassword email={searchParams.email} />
    </section>
  );
}
