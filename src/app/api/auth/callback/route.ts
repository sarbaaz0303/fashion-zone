import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import moment from 'moment';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // This will purge the client-side router cache, and revalidate the data cache on the next page visit.
      revalidatePath('/', 'layout');
      cookies().set('toast', 'success');

      await supabase
        .from('users')
        .update({ last_sign_in_at: moment().format() })
        .eq('email', data.user.email);

      const redirect = await supabase.from('users').select('is_user_onboarded');
      if (!redirect.error) {
        return NextResponse.redirect(
          `${origin}${
            !redirect.data[0].is_user_onboarded ? '/dashboard' : '/onboarding'
          }`,
        );
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
