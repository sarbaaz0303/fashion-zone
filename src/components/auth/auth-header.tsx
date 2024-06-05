import Image from 'next/image';

import { AuthType } from '@/lib/zod/auth-schema';

type AuthHeaderProps = {
  type: AuthType;
  name: string;
};

export default function AuthHeader({ type, name }: AuthHeaderProps) {
  return (
    <header className='flex flex-col gap-5 md:gap-8'>
      <div className='flex  items-center gap-2'>
        <Image src='/logo.svg' height={34} width={34} alt={name + ' Logo'} />
        <h1 className='text-3xl font-bold text-logo'>{name}</h1>
      </div>
      <div className='flex flex-col gap-1 md:gap-3'>
        <h1 className='text-2xl font-medium text-gray-900 dark:text-gray-100 lg:text-4xl'>
          {type === AuthType.SignIn ? 'Welcome back' : 'Get started'}
          <p className='text-base font-normal text-gray-600 dark:text-gray-400'>
            {type === AuthType.SignIn
              ? 'Sign in to your account'
              : 'Create a new account'}
          </p>
        </h1>
      </div>
    </header>
  );
}
