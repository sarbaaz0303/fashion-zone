import ResetAuthForm from '@/components/reset-auth-form';
import { ResetAuthType } from '@/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
};

type search = {
  searchParams: {
    email: string;
  };
};

export default async function ForgotPasswordPage({ searchParams }: search) {
  return (
    <section className='grid min-h-screen w-full place-items-center'>
      <ResetAuthForm type={ResetAuthType.ResetPassword} />
    </section>
  );
}
