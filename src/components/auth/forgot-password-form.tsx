'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ButtonCloseIcon } from '../shared/button-close-icon';
import Loading from '../shared/loading';

import { createClient } from '@/lib/supabase/client';
import { PasswordResetMailSchema } from '@/lib/zod/auth-schema';

type ForgotPasswordFormProps = {
  email: string;
};

export default function ForgotPasswordForm({ email }: ForgotPasswordFormProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const formSchema = PasswordResetMailSchema;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email,
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(
        formData.email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        },
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onFormError)}
        className='space-y-8'>
        {/* Email */}
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
          {isLoading ? <Loading /> : 'Send Reset Email'}
        </Button>
      </form>
    </Form>
  );
}
