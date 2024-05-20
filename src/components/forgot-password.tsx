'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { z } from 'zod';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

import { Loader2 } from 'lucide-react';
import { ButtonCloseIcon } from './shared/button-close-icon';
import { AppData } from '@/static/app-metadata';
import { EmailOnlySchema } from '@/lib/types';

const { short_name } = AppData;

export default function ForgotPassword({ email }: { email: string }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const formSchema = EmailOnlySchema;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || '',
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const supabase = createClient();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        formData.email,
      );

      if (error) {
        const uuid = crypto.randomUUID();
        toast.error(error.message, {
          id: uuid,
          action: <ButtonCloseIcon toastId={uuid} />,
          duration: 5000,
        });

        console.error(error.name);
      } else {
        const uuid = crypto.randomUUID();
        toast.success(
          'If you registered using your email and password, you will receive a password reset email. The password reset link expires in 10 minutes.',
          {
            id: uuid,
            action: <ButtonCloseIcon toastId={uuid} />,
            duration: 5000,
          },
        );

        router.push('/sign-in');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 3.On Form Error
  const onFormError: SubmitErrorHandler<z.infer<typeof formSchema>> = (
    error,
  ) => {
    console.error(error);
  };

  return (
    <section className='flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 px-4 md:gap-8'>
      <header className='flex flex-col gap-4 md:gap-8'>
        <div className='flex items-center gap-2'>
          <Image
            src='/logo.svg'
            height={34}
            width={34}
            alt={short_name + ' Logo'}
          />
          <h1 className='text-3xl font-bold text-logo'>{short_name}</h1>
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-medium text-gray-900 dark:text-gray-100'>
            Reset Your Password
          </h1>
          <p className='text-sm font-normal text-gray-600 dark:text-gray-400'>
            Type in your email and we'll send you a link to reset your password
          </p>
        </div>
      </header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onFormError)}
          className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <div className='flex flex-col gap-2'>
                  <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Email
                  </FormLabel>
                  <div className='flex w-full flex-col'>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='you@example.com'
                        className='font-sans text-base text-gray-900 placeholder:text-base placeholder:text-gray-500 dark:text-gray-100'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='mt-2 text-xs text-red-500' />
                  </div>
                </div>
              </FormItem>
            )}
          />
          <Button
            type='submit'
            disabled={isLoading}
            className='w-full text-base font-semibold text-slate-50'>
            {isLoading ? (
              <>
                <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
              </>
            ) : (
              'Send Reset Email'
            )}
          </Button>
        </form>
      </Form>
      <footer className='mt-4 flex justify-center gap-1'>
        <p className='text-sm font-normal text-gray-600 dark:text-gray-400'>
          Already have an account?
        </p>
        <Link
          href={'/sign-in'}
          className='cursor-pointer text-sm font-medium text-accent hover:underline'>
          Sign In Now
        </Link>
      </footer>
    </section>
  );
}
