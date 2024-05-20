import moment from 'moment';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';
import { AuthFormSchema, AuthType } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const userData = await request.json();

    // Validate the form data
    const signUpSchema = AuthFormSchema(AuthType.SignUp);
    const validate = signUpSchema.safeParse(userData);

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
    const { error } = await supabase.auth.signUp({
      email: validate.data.email,
      password: validate.data.password,
    });

    // return NextResponse.json({ data, error });

    if (error) {
      if (error?.code === 'user_already_exists') {
        return NextResponse.json(
          {
            data: {},
            error: {
              code: error.name,
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
              code: error.name,
              message: error.message,
            },
          },
          { status: 400 },
        );
      }
    }

    // This will purge the client-side router cache, and revalidate the data cache on the next page visit.
    revalidatePath('/', 'layout');
    cookies().set('toast', 'success');

    await supabase
      .from('users')
      .update({ last_login: moment().format() })
      .eq('email', validate.data.email);

    const redirect = await supabase.from('users').select('is_user_onboarded');
    if (redirect.error) {
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
          redirect: redirect.data[0].is_user_onboarded
            ? 'dashboard'
            : 'onboarding',
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
