'use client';

import { useState } from 'react';
import Image from 'next/image';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AppData } from '@/static/app-metadata';
import { SignInSchema } from '@/lib/types';
import { sleep } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Loader2, Mail } from 'lucide-react';
import { InputPassword } from '../ui/input-password';
import { Button } from '../ui/button';
import Link from 'next/link';

const { short_name } = AppData;

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = SignInSchema;

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

  // 3. Handle OAuth
  const onOAuthSignIn = async () => {
    setIsLoading(true);

    try {
      await sleep(2000);
      // console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className='flex flex-col gap-5 md:gap-8'>
        <div className='flex  items-center gap-2'>
          <Image
            src='/logo.svg'
            width={34}
            height={34}
            alt={short_name + ' Logo'}
          />
          <h1 className='text-logo text-3xl font-bold'>{short_name}</h1>
        </div>
        <div className='flex flex-col gap-1 md:gap-3'>
          <h1 className='text-2xl font-medium text-gray-900 dark:text-gray-100 lg:text-4xl'>
            Welcome back
            <p className='text-base font-normal text-gray-600 dark:text-gray-400'>
              Sign in to your account
            </p>
          </h1>
        </div>
      </header>
      <section>
        <Button
          type='button'
          variant='outline'
          disabled={isLoading}
          className='w-full gap-x-1 hover:bg-secondary'
          onClick={onOAuthSignIn}>
          {isLoading ? (
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
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
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
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <div className='flex flex-col gap-1.5'>
                  <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Password
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
              )}
            />
            <Button
              type='submit'
              disabled={isLoading}
              className='w-full text-base font-semibold text-slate-50'>
              {isLoading ? (
                <>
                  <Loader2 size={20} className='animate-spin' /> &nbsp;
                  Loading...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>
        <footer className='flex justify-center gap-1'>
          <p className='text-sm font-normal text-gray-600 dark:text-gray-400'>
            Don&apos;t have an account?
          </p>
          <Link
            href={'/signup'}
            className='cursor-pointer text-sm font-medium text-accent'>
            Sign Up
          </Link>
        </footer>
      </>
    </>
  );
}
