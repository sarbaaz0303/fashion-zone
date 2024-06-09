import Link from 'next/link';
import { AuthType } from '@/lib/zod/auth-schema';

type AuthFooterProps = {
  type: AuthType;
  name: string;
};

export default function AuthFooter({ type, name }: AuthFooterProps) {
  return (
    <>
      <section className='flex justify-center gap-1'>
        <p className='text-sm font-normal text-gray-600 dark:text-gray-400'>
          {type === AuthType.SignIn
            ? "Don't have an account?"
            : 'Have an account?'}
        </p>
        <Link
          href={type == AuthType.SignIn ? '/sign-up' : '/sign-in'}
          className='cursor-pointer text-sm font-medium text-accent hover:underline'>
          {type === AuthType.SignIn ? 'Sign Up Now' : 'Sign In Now'}
        </Link>
      </section>
      <div className='flex items-center justify-center'>
        <footer className='mt-8 w-4/5 text-center text-xs text-gray-600 dark:text-gray-400'>
          <span>
            By continuing, you agree to {name}&apos;s&nbsp;
            <span className='cursor-pointer underline hover:text-accent'>
              Terms of Service
            </span>
            &nbsp;and&nbsp;
            <span className='cursor-pointer underline hover:text-accent'>
              Privacy Policy
            </span>
            .
          </span>
        </footer>
      </div>
    </>
  );
}
