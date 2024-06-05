'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { createClient } from '@/lib/supabase/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/input-password';
import { Button } from '@/components/ui/button';
import { ButtonCloseIcon } from '@/components/shared/button-close-icon';

import { Loader2 } from 'lucide-react';
import { AppData } from '@/lib/static/app-metadata';
import { AuthFormSchema, AuthType } from '@/lib/zod/auth-schema';

const { short_name } = AppData;

export default function AuthForm({ type }: { type: AuthType }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isOAuthLoading, setIsOAuthLoading] = useState(false);

  const supabase = createClient();

  const formSchema = AuthFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Watching email for reset-mail autofill email
  const userEmail = form.watch('email');

  // 2. Handle the form submission.
  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if (type === AuthType.SignIn) {
        // Sign In
        const response = await fetch('/api/auth/sign-in', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const jsonResponse = await response.json();

        if (jsonResponse.error?.code) {
          const uuid = crypto.randomUUID();
          toast.error(jsonResponse.error.message, {
            id: uuid,
            action: <ButtonCloseIcon toastId={uuid} />,
          });

          console.error(jsonResponse.error?.code);
        }

        if (jsonResponse.data?.redirect) {
          router.push(jsonResponse.data.redirect);
        }
      } else {
        // Sign Up
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
          router.push('/' + jsonResponse.data.redirect);
        }
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

  // 4. Handle OAuth
  const onOAuthSignIn = async () => {
    setIsOAuthLoading(true);

    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsOAuthLoading(false);
    }
  };

  return (
    <>
      <header className='flex flex-col gap-5 md:gap-8'>
        <div className='flex  items-center gap-2'>
          <Image
            src='/logo.svg'
            height={34}
            width={34}
            alt={short_name + ' Logo'}
          />
          <h1 className='text-3xl font-bold text-logo'>{short_name}</h1>
        </div>
        <div className='flex flex-col gap-1 md:gap-3'>
          <h1 className='text-2xl font-medium text-gray-900 dark:text-gray-100 lg:text-4xl'>
            {type === AuthType.SignIn ? 'Welcome back' : 'Get started'}
            <p className='text-base font-normal text-gray-600 dark:text-gray-400'>
              {type === AuthType.SignIn
                ? 'Sign in to your account'
                : 'Create a new account'}
            </p>
          </h1>
        </div>
      </header>
      <section>
        <Button
          type='button'
          variant='outline'
          disabled={isOAuthLoading}
          className='w-full gap-x-1 hover:bg-secondary'
          onClick={onOAuthSignIn}>
          {isOAuthLoading ? (
            <>
              <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
            </>
          ) : (
            <>
              <Image
                src='/svg/google.svg'
                alt='Google logo'
                width={20}
                height={20}
              />
              Continue with Google
            </>
          )}
        </Button>
      </section>
      <section className='flex items-center'>
        <span className='flex-grow border-b'></span>
        <span className='bg-background px-4 text-sm text-gray-500 dark:text-gray-400'>
          or
        </span>
        <span className='flex-grow border-b'></span>
      </section>
      <>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onFormError)}
            className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <div className='flex flex-col gap-1.5'>
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
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <div className='flex flex-col gap-1.5'>
                    <FormLabel className='flex w-full items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300'>
                      <span>Password</span>
                      {type === AuthType.SignIn && (
                        <Link
                          href={`/forgot-password?email=${userEmail}`}
                          className='hover:underline'>
                          Forgot Password?
                        </Link>
                      )}
                    </FormLabel>
                    <div className='flex w-full flex-col'>
                      <FormControl>
                        <InputPassword
                          type='password'
                          iconProps={{ size: 20 }}
                          placeholder='Enter your password'
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
            {type === AuthType.SignUp && (
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex flex-col gap-1.5'>
                      <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                        Confirm Password
                      </FormLabel>
                      <div className='flex w-full flex-col'>
                        <FormControl>
                          <InputPassword
                            type='password'
                            iconProps={{ size: 20 }}
                            placeholder='Confirm your password'
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
            )}
            <Button
              type='submit'
              disabled={isLoading}
              className='w-full text-base font-semibold text-slate-50'>
              {isLoading ? (
                <>
                  <Loader2 size={20} className='animate-spin' /> &nbsp;
                  Loading...
                </>
              ) : type === AuthType.SignIn ? (
                'Sign In'
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </Form>
        <section className='flex justify-center gap-1'>
          <p className='text-sm font-normal text-gray-600 dark:text-gray-400'>
            {type === AuthType.SignIn
              ? "Don't have an account?"
              : 'Have an account?'}
          </p>
          <Link
            href={type == AuthType.SignIn ? '/sign-up' : '/sign-in'}
            className='cursor-pointer text-sm font-medium text-accent hover:underline'>
            {type === AuthType.SignIn ? 'Sign Up Now' : 'Sign In Now'}
          </Link>
        </section>
        <footer className='mt-8 w-4/5 text-center text-xs text-gray-600 dark:text-gray-400'>
          <span>
            By continuing, you agree to {short_name}&apos;s&nbsp;
            <span className='cursor-pointer underline hover:text-accent'>
              Terms of Service
            </span>
            &nbsp;and&nbsp;
            <span className='cursor-pointer underline hover:text-accent'>
              Privacy Policy
            </span>
            .
          </span>
        </footer>
      </>
    </>
  );
}
