import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { z } from 'zod';
import { OnboardingFormSchema } from '@/lib/types';
import { Input } from './ui/input';

export function PersonalInfo({
  form,
}: {
  form: UseFormReturn<z.infer<typeof OnboardingFormSchema>>;
}) {
  return (
    <>
      <h3>PersonalInfo</h3>
      <FormField
        control={form.control}
        name='first_name'
        render={({ field }) => (
          <FormItem>
            <div className='flex flex-col gap-1.5'>
              <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                First Name
              </FormLabel>
              <div className='flex w-full flex-col'>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='First Name'
                    className='font-sans text-base text-gray-900 placeholder:text-base placeholder:text-gray-500 dark:text-gray-100'
                    {...form.register('first_name', { required: true })}
                    {...field}
                  />
                </FormControl>
                <FormMessage className='mt-2 text-xs text-red-500' />
              </div>
            </div>
          </FormItem>
        )}
      />
    </>
  );
}
export function AddressInfo({
  form,
}: {
  form: UseFormReturn<z.infer<typeof OnboardingFormSchema>>;
}) {
  return (
    <>
      <h3>AddressInfo</h3>
      <FormField
        control={form.control}
        name='city'
        render={({ field }) => (
          <FormItem>
            <div className='flex flex-col gap-1.5'>
              <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                City
              </FormLabel>
              <div className='flex w-full flex-col'>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='City'
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
    </>
  );
}
export function CompanyInfo({
  form,
}: {
  form: UseFormReturn<z.infer<typeof OnboardingFormSchema>>;
}) {
  return (
    <>
      <h3>CompanyInfo</h3>
      <FormField
        control={form.control}
        name='company_name'
        render={({ field }) => (
          <FormItem>
            <div className='flex flex-col gap-1.5'>
              <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                Comapny Name
              </FormLabel>
              <div className='flex w-full flex-col'>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Comapny Name'
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
    </>
  );
}
