import ResetAuthHeader from '@/components/auth-reset/reset-auth-header';
import ResetPasswordForm from '@/components/auth-reset/reset-password-form';

import { AppData } from '@/lib/static/app-metadata';
import { ResetAuthType } from '@/lib/zod/auth-schema';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
};

const { short_name } = AppData;

export default async function ResetPasswordPage() {
  return (
    <section className='grid min-h-screen w-full place-items-center'>
      <section className='flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 px-4 md:gap-8'>
        <ResetAuthHeader type={ResetAuthType.ResetPassword} name={short_name} />
        <ResetPasswordForm />
      </section>
    </section>
  );
}
