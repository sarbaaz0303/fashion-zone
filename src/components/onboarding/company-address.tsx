import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { OnboardingFormSchema } from '@/lib/zod/onboarding-schema';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

type CompanyAddressProps = {
  form: UseFormReturn<z.infer<typeof OnboardingFormSchema>>;
};

export default function CompanyAddress({ form }: CompanyAddressProps) {
  return (
    <div className='grid gap-4'>
      <div className='grid grid-cols-1 gap-4'>
        {/* Address */}
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Address
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Textarea
                      placeholder='Enter your company address'
                      className='resize-none font-sans text-base text-gray-900 placeholder:text-base placeholder:text-gray-500 dark:text-gray-100'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='mt-2 text-xs text-red-500' />
                </div>
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {/* City */}
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
                    <Input type='text' placeholder='Enter city' {...field} />
                  </FormControl>
                  <FormMessage className='mt-2 text-xs text-red-500' />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* State */}
        <FormField
          control={form.control}
          name='state'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                  State
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input type='text' placeholder='Enter state' {...field} />
                  </FormControl>
                  <FormMessage className='mt-2 text-xs text-red-500' />
                </div>
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {/* Country */}
        <FormField
          control={form.control}
          name='country'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Country
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input type='text' placeholder='Enter country' {...field} />
                  </FormControl>
                  <FormMessage className='mt-2 text-xs text-red-500' />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* Postal Code */}
        <FormField
          control={form.control}
          name='postalCode'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Postal Code
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Enter postal code'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='mt-2 text-xs text-red-500' />
                </div>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
