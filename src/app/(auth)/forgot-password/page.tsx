import ResetAuthForm from '@/components/auth/reset-auth-form';
import { ResetAuthType } from '@/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

type ForgotPasswordPageType = {
  searchParams: {
    email: string;
  };
};

export default async function ForgotPasswordPage({
  searchParams,
}: ForgotPasswordPageType) {
  return (
    <section className='grid min-h-screen w-full place-items-center'>
      <ResetAuthForm
        type={ResetAuthType.ForgotPassword}
        email={searchParams.email}
      />
    </section>
  );
}
