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
import { ResetPasswordSchema } from '@/lib/zod/auth-schema';
import { InputPassword } from '../ui/input-password';

export default function ResetPasswordForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const formSchema = ResetPasswordSchema;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log(formData);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.updateUser({
        password: formData.password,
      });

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
        toast.success('Password reset successfully.', {
          id: uuid,
          action: <ButtonCloseIcon toastId={uuid} />,
          duration: 5000,
        });

        await supabase.auth.signOut();
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
          name='password'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-2'>
                <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
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
        <Button
          type='submit'
          disabled={isLoading}
          className='w-full text-base font-semibold text-slate-50'>
          {isLoading ? <Loading /> : 'Reset Password'}
        </Button>
      </form>
    </Form>
  );
}
