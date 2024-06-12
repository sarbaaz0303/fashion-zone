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

type AddressInformationProps = {
  form: UseFormReturn<z.infer<typeof OnboardingFormSchema>>;
};

export default function AddressInformation({ form }: AddressInformationProps) {
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
                  placeholder='Enter your residential address'
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

{/* city */}
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
                      placeholder='Enter first name'
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
