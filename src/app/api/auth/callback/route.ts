import moment from 'moment';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';

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

      /**
       * TODO: Update last_sign_in_at and getting is_user_onboarded can be merged
       */
      await supabase
        .from('users')
        .update({ last_sign_in_at: moment().format() })
        .eq('email', data.user.email);

      const redirect = await supabase
        .from('users')
        .select('is_user_onboarded')
        .single();
      if (!redirect.error) {
        return NextResponse.redirect(
          `${origin}${
            redirect.data?.is_user_onboarded ? '/dashboard' : '/onboarding'
          }`,
        );
      }
    }
  }

  /**
   * return the user to an error page with instructions
   * TODO: Add error page with instructions
   */
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
