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

type CompanyInformationProps = {
  form: UseFormReturn<z.infer<typeof OnboardingFormSchema>>;
};

export default function CompanyInformation({ form }: CompanyInformationProps) {
  return (
    <FormField
      control={form.control}
      name='companyName'
      render={({ field }) => (
        <FormItem>
          <div className='flex flex-col gap-1.5'>
            <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
              Company Name
            </FormLabel>
            <div className='flex w-full flex-col'>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Company Name'
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
  );
}
