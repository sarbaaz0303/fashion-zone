export default function LoginLayout({ children }: Readonly<Children>) {
  return (
    <main className='flex min-h-screen w-full justify-between'>
      <section className='flex-center size-full max-sm:px-6'>
        {children}
      </section>
      <div className='relative flex min-h-screen w-full items-center justify-end bg-sky max-lg:hidden'>
        <div className='absolute left-5 top-20 '>
          {/* SVG Here */}
          <div className='h-[500px] w-[500px] bg-accent'></div>
        </div>
      </div>
    </main>
  );
}
