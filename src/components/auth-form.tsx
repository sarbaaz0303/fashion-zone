'use client';

import Image from 'next/image';
import { useState } from 'react';
import { z } from 'zod';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AppData } from '@/static/app-metadata';
import { AuthFormSchema } from '@/lib/types';
import { sleep } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Loader2, Mail } from 'lucide-react';
import { InputPassword } from './ui/input-password';
import { Button } from './ui/button';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const { short_name } = AppData;

export default function AuthForm({ type }: { type: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOAuthLoading, setIsOAuthLoading] = useState(false);

  const formSchema = AuthFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Handle the form submission.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      await sleep(2000);
      console.log(data);
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
    console.log(error);
  };

  // 4. Handle OAuth
  const onOAuthSignIn = async () => {
    const supabase = createClient();
    setIsOAuthLoading(true);
    supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    

    try {
      await sleep(2000);
      // console.log(data);
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
            {type === 'sign-in' ? 'Welcome back' : 'Get started'}
            <p className='text-base font-normal text-gray-600 dark:text-gray-400'>
              {type === 'sign-in'
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
                      {type === 'sign-in' && (
                        <Link
                          href='/forgot-password'
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
            {type === 'sign-up' && (
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
              ) : type === 'sign-in' ? (
                'Sign In'
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </Form>
        <section className='flex justify-center gap-1'>
          <p className='text-sm font-normal text-gray-600 dark:text-gray-400'>
            {type === 'sign-in' ? "Don't have an account?" : 'Have an account?'}
          </p>
          <Link
            href={type == 'sign-in' ? '/sign-up' : '/sign-in'}
            className='cursor-pointer text-sm font-medium text-accent hover:underline'>
            {type === 'sign-in' ? 'Sign Up Now' : 'Sign In Now'}
          </Link>
        </section>
        <footer className='mt-8 w-4/5 text-center text-xs text-gray-600 dark:text-gray-400'>
          <span>
            By continuing, you agree to {short_name}&apos;s&nbsp;
            <span className='cursor-pointer underline hover:text-accent'>
              Terms of Service
            </span>{' '}
            and&nbsp;
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
