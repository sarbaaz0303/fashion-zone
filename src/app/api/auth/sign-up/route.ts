import moment from 'moment';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';
import { SignUpSchema } from '@/lib/zod/auth-schema';

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const userData = await request.json();

    // Validate the form data
    const validate = SignUpSchema.safeParse(userData);

    if (!validate.success) {
      return NextResponse.json(
        {
          data: {},
          error: {
            code: validate.error.issues[0].code,
            message: validate.error.issues[0].message,
          },
        },
        { status: 400 },
      );
    }

    // Sign up user
    const { error: supabaseError } = await supabase.auth.signUp({
      email: validate.data.email,
      password: validate.data.password,
    });

    if (supabaseError) {
      if (supabaseError?.code === 'user_already_exists') {
        return NextResponse.json(
          {
            data: {},
            error: {
              code: supabaseError.name,
              message: 'Email already registered',
            },
          },
          { status: 422 },
        );
      } else {
        return NextResponse.json(
          {
            data: {},
            error: {
              code: supabaseError.name,
              message: supabaseError.message,
            },
          },
          { status: 400 },
        );
      }
    }

    // This will purge the client-side router cache, and revalidate the data cache on the next page visit.
    revalidatePath('/', 'layout');
    cookies().set('toast', 'success');

    /**
     * TODO: Update last_sign_in_at and getting is_user_onboarded can be merged
     */
    await supabase
      .from('users')
      .update({ last_sign_in_at: moment().format() })
      .eq('email', validate.data.email);

    const { data: userOnboardedData, error: userOnboardedError } =
      await supabase.from('users').select('is_user_onboarded');
    if (userOnboardedError) {
      return NextResponse.json(
        {
          data: {},
          error: {
            code: 'supabase_error',
            message: 'Internal server error',
          },
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        data: {
          redirect: userOnboardedData[0].is_user_onboarded
            ? '/dashboard'
            : '/onboarding',
        },
        error: {},
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        data: {},
        error: {
          code: 'internal_error',
          message: 'Internal server error',
        },
      },
      { status: 500 },
    );
  }
}
