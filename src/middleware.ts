import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { createClient } from './lib/supabase/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);

  return NextResponse.next();

  // const { response, user } = await updateSession(request);

  // console.log('middleware: ', user?.data?.user?.email);
  // console.log(user);

  // const isSessionActive = user?.data?.user?.id;

  // if (isSessionActive) {
  //   if (url.pathname === '/onboarding') {
  //     const supabase = createClient();
  //     const { data: supabaseUserData, error: supabaseError } = await supabase
  //       .from('users')
  //       .select('is_user_onboarded')
  //       .eq('email', user?.data?.user?.email)
  //       .single();

  //     if (supabaseUserData?.is_user_onboarded) {
  //       return NextResponse.redirect(new URL('/dashboard', url.origin));
  //     }
  //   }
  // }

  //   const loginRoute = ['/signin', '/signup'];

  // if (process.env.NODE_ENV === 'development' && url.pathname !== '/signin') {
  //   return NextResponse.redirect(new URL('/signin', url.origin));
  // }

  //   if (isSessionActive) {
  //     // Redirect from / to /dashboard if user is logged in
  //     if (url.pathname === '/') {
  //       return NextResponse.redirect(new URL('/dashboard', url.origin));
  //     }

  //     // Protect route signin/signup when user is logged in
  //     if (loginRoute.includes(url.pathname)) {
  //       return NextResponse.redirect(new URL('/dashboard', url.origin));
  //     }
  //   }

  //   if (!isSessionActive) {
  //     // Redirect to Login if session expired
  //     if (url.pathname === '/') {
  //       return NextResponse.redirect(new URL('/signin', url.origin));
  //     }

  //     // Protect route Dashboard when user is not logged in
  //     if (!loginRoute.includes(url.pathname)) {
  //       return NextResponse.redirect(new URL('/signin', url.origin));
  //     }
  //   }

  // return response;
}
