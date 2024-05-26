export default function Loading() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4'>
      <div className='h-12 w-12 animate-spin rounded-full border-4 border-gray-900 border-t-transparent dark:border-gray-50 dark:border-t-transparent' />
      <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
        Loading...
      </p>
    </div>
  );
}
