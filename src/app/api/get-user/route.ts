import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { id } = await request.json();

    const { data, error } = await supabase
      .from('personal_info')
      .select('*')
      .eq('uuid', id)
      .single();

    if (error) {
      return NextResponse.json(
        {
          data: {},
          error: {
            code: error.code,
            message: 'Internal server error',
          },
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        data: data,
        error: null,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
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
