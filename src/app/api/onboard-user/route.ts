import { createClient } from '@/lib/supabase/server';
import { extractPhoneParts } from '@/lib/utils';
import { OnboardingFormSchema } from '@/lib/zod/onboarding-schema';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const data = await request.json();

    const onboardingData = {
      ...data,
      birthDate: new Date(data.birthDate),
    };

    // Validate the form data
    const validate = OnboardingFormSchema.safeParse(onboardingData);
    if (!validate.success) {
      const issue = validate.error.issues[0];
      return NextResponse.json(
        {
          data: {},
          error: {
            code: issue.code,
            message: issue.message,
          },
        },
        { status: 400 },
      );
    }

    // Onboard user
    const { data: supabaseUserData, error: supabaseUserError } = await supabase
      .from('users')
      .select('uuid')
      .eq('email', validate.data.email)
      .single();

    if (supabaseUserError) {
      return NextResponse.json(
        {
          data: {},
          error: {
            code: supabaseUserError.code,
            message: 'Internal server error',
          },
        },
        { status: 500 },
      );
    }

    const phone1 = extractPhoneParts(validate.data.phone1);
    const phone2 = extractPhoneParts(validate.data.phone2);

    const { error: supabaseError } = await supabase
      .from('personal_info')
      .insert({
        uuid: supabaseUserData?.uuid,
        first_name: validate.data.firstName,
        last_name: validate.data.lastName || null,
        birth_date: data.birthDate,
        email: validate.data.email,
        extension_1: phone1.countryCode || null,
        phone_1: phone1.mainNumber || null,
        extension_2: phone2.countryCode || null,
        phone_2: phone2.mainNumber || null,

        company_name: validate.data.companyName,
        sequential_invoice:
          validate.data.sequentialInvoice === 'true' ? true : false,
        invoice_id: Number(validate.data.invoiceId),
        gst: validate.data.gst,
        pan: validate.data.pan,
        hsn: validate.data.hsnCode,
        cgst: Number(validate.data.cgst),
        sgst: Number(validate.data.sgst),
        igst: Number(validate.data.igst),
        utgst: Number(validate.data.utgst),
        tds: Number(validate.data.tds),
        discount: Number(validate.data.discount),

        address: validate.data.address,
        city: validate.data.city,
        state: validate.data.state,
        country: validate.data.country,
        postal: validate.data.postalCode,
      });

    if (supabaseError) {
      return NextResponse.json(
        {
          data: {},
          error: {
            code: supabaseError.code,
            message: 'Internal server error',
          },
        },
        { status: 500 },
      );
    }

    cookies().set('toast', 'success');

    // Update user onboarding status
    try {
      await supabase
        .from('users')
        .update({ is_user_onboarded: true })
        .eq('email', validate.data.email);
    } catch (error) {
      try {
        await supabase
          .from('users')
          .update({ is_user_onboarded: true })
          .eq('email', validate.data.email);
      } catch (error) {
        throw error;
      }
    }

    return NextResponse.json(
      {
        data: {
          redirect: '/dashboard',
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
