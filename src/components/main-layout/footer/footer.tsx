import Link from 'next/link';

type LayoutFooterProps = {
  name: string;
};

export default function LayoutFooter({ name }: LayoutFooterProps) {
  return (
    <footer className='m-4 flex items-center rounded-md bg-color py-4'>
      <div className='container flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row'>
        <p className='text-sm text-muted-foreground'>
          &copy; 2024 {name}. All rights reserved.
        </p>
        <nav className='flex flex-wrap items-center justify-center gap-4 sm:gap-6'>
          <Link
            href='#'
            className='text-sm underline-offset-4 hover:underline'
            prefetch={false}>
            Privacy Policy
          </Link>
          <Link
            href='#'
            className='text-sm underline-offset-4 hover:underline'
            prefetch={false}>
            Terms of Service
          </Link>
          <Link
            href='#'
            className='text-sm underline-offset-4 hover:underline'
            prefetch={false}>
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
