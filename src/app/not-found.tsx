import Link from 'next/link';
import Astronaut404 from '@/assets/tsx-svg/astronaut-404';

export default async function NotFound() {
  return (
    <div className='m-auto flex min-h-screen w-10/12 items-center justify-center'>
      {/* Left Layout (Desktop) */}
      <div className='hidden p-8 md:flex md:w-1/2'>
        <Astronaut404 className='text-accent' />
      </div>

      {/* Right Layout (Both Mobile and Desktop) */}
      <div className='w-full p-4 md:w-1/2 md:p-8'>
        <h1 className='mb-4 text-4xl font-bold md:text-6xl'>404 Not Found</h1>
        <p className='mb-8 text-lg text-gray-600 dark:text-gray-300 md:text-xl'>
          Oops! The page you are looking for could not be found.
        </p>
        <Link
          href='/dashboard'
          className='inline-block rounded-lg bg-accent px-6 py-3 text-white transition duration-300 ease-in-out hover:bg-primary'>
          Go to Home
        </Link>
      </div>
    </div>
  );
}
