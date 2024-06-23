import Image from 'next/image';
import { ResetAuthType } from '@/lib/zod/auth-schema';

type ResetAuthHeaderProps = {
  type: ResetAuthType;
  name: string;
};

export default function ResetAuthHeader({ type, name }: ResetAuthHeaderProps) {
  return (
    <header className='flex flex-col gap-4 md:gap-8'>
      <div className='flex items-center gap-2'>
        <Image src='/logo.svg' height={34} width={34} alt={name + ' Logo'} />
        <h1 className='text-3xl font-bold text-logo'>{name}</h1>
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-medium text-gray-900 dark:text-gray-100'>
          {type === ResetAuthType.ForgotPassword
            ? 'Reset Your Password'
            : 'Create a New Password'}
        </h1>
        <p className='text-sm font-normal text-gray-600 dark:text-gray-400'>
          {type === ResetAuthType.ForgotPassword
            ? "Type in your email and we'll send you a link to reset your password"
            : 'Set a new password to regain access to your account.'}
        </p>
      </div>
    </header>
  );
}
