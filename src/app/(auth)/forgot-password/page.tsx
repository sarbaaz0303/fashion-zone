import Link from 'next/link';

import ResetAuthHeader from '@/components/auth-reset/reset-auth-header';
import ForgotPasswordForm from '@/components/auth-reset/forgot-password-form';

import { AppData } from '@/lib/static/app-metadata';
import { ResetAuthType } from '@/lib/zod/auth-schema';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

const { short_name } = AppData;

type ForgotPasswordPageProps = {
  searchParams: {
    email: string;
  };
};

export default async function ForgotPasswordPage({
  searchParams,
}: ForgotPasswordPageProps) {
  return (
    <section className='grid min-h-screen w-full place-items-center'>
      <section className='flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 px-4 md:gap-8'>
        <ResetAuthHeader
          type={ResetAuthType.ForgotPassword}
          name={short_name}
        />
        <ForgotPasswordForm email={searchParams.email} />
        <footer className='mt-4 flex justify-center gap-1'>
          <p className='text-sm font-normal text-gray-600 dark:text-gray-400'>
            Already have an account?
          </p>
          <Link
            href={'/sign-in'}
            className='cursor-pointer text-sm font-medium text-accent hover:underline'>
            Sign In Now
          </Link>
        </footer>
      </section>
    </section>
  );
}
