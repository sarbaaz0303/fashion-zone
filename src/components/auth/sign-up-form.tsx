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
import { InputPassword } from '../ui/input-password';
import { Button } from '../ui/button';
import { ButtonCloseIcon } from '../shared/button-close-icon';
import Loading from '../shared/loading';

import { SignUpSchema } from '@/lib/zod/auth-schema';

export default function SignUpForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const formSchema = SignUpSchema;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // 2. Handle the form submission.
  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const jsonResponse = await response.json();

      if (jsonResponse.error?.code) {
        const uuid = crypto.randomUUID();
        toast.error(jsonResponse.error.message, {
          id: uuid,
          action: <ButtonCloseIcon toastId={uuid} />,
          duration:
            jsonResponse.error.code === 'AuthApiError' ? 5000 : undefined,
        });

        console.error(jsonResponse.error?.code);
      }

      if (jsonResponse.data?.redirect) {
        router.push(jsonResponse.data.redirect);
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
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px]'>Email</FormLabel>
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
        {/* Password */}
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='flex w-full items-center justify-between'>
                  Password
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <InputPassword
                      type='password'
                      iconProps={{ size: 20 }}
                      placeholder='Enter your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='mt-2 text-xs text-red-500' />
                </div>
              </div>
            </FormItem>
          )}
        />
        {/* Confirm Password */}
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px]'>
                  Confirm Password
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <InputPassword
                      type='password'
                      iconProps={{ size: 20 }}
                      placeholder='Confirm your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='mt-2 text-xs text-red-500' />
                </div>
              </div>
            </FormItem>
          )}
        />
        {/* Submit Form */}
        <Button
          type='submit'
          disabled={isLoading}
          className='w-full text-base font-semibold text-slate-50'>
          {isLoading ? <Loading /> : 'Sign In'}
        </Button>
      </form>
    </Form>
  );
}
