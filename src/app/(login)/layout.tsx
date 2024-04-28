export default function LoginLayout({ children }: Children) {
  return (
    <div className='grid min-h-screen place-content-center'>
      <section className='max-w-[450px]'>{children}</section>
    </div>
  );
}
