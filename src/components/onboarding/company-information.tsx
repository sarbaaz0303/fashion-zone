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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { cn } from '@/lib/utils';
import InfoTooltip from '../shared/info-tooltip';

type CompanyInformationProps = {
  form: UseFormReturn<z.infer<typeof OnboardingFormSchema>>;
};

export default function CompanyInformation({ form }: CompanyInformationProps) {
  return (
    <div className='grid gap-4'>
      <div className='grid grid-cols-1 gap-4'>
        {/* Company Name */}
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
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {/* Sequential Invoice */}
        <FormField
          control={form.control}
          name='sequentialInvoice'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='flex w-full max-w-[280px] items-center gap-x-1'>
                  <p>Sequential Invoice</p>
                  <InfoTooltip>
                    Whether each new client starts with invoice number 1, or if
                    invoice numbers should continue to increase sequentially,
                    regardless of the client.
                  </InfoTooltip>
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          'font-sans text-base text-gray-900 dark:text-gray-100',
                          !field.value && 'text-muted-foreground',
                        )}>
                        <SelectValue placeholder='Select your preference' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='true'>True</SelectItem>
                      <SelectItem value='false'>False</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className='mt-2 text-xs text-red-500' />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* Invoice id */}
        <FormField
          control={form.control}
          name='invoiceId'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px]'>
                  Invoice id
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Enter starting invoice id'
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
        {/* HSN Code */}
        <FormField
          control={form.control}
          name='hsnCode'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='flex w-full max-w-[280px] items-center gap-x-1'>
                  <p>HSN Code</p>
                  <InfoTooltip>
                    HSN code is an internationally accepted system for
                    classifying goods in a systematic and logical manner. It is
                    used to identify products for customs and taxation purposes.
                  </InfoTooltip>
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Enter HSN Code'
                      maxLength={8}
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
        {/* GST */}
        <FormField
          control={form.control}
          name='gst'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px]'>
                  GST Number
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Enter GST Number'
                      maxLength={15}
                      className='uppercase'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='mt-2 text-xs text-red-500' />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* PAN */}
        <FormField
          control={form.control}
          name='pan'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px]'>
                  PAN Number
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Enter PAN Number'
                      maxLength={10}
                      className='uppercase'
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
        {/* CGST */}
        <FormField
          control={form.control}
          name='cgst'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px]'>CGST (%)</FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Enter CGST percentage'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='mt-2 text-xs text-red-500' />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* SGST */}
        <FormField
          control={form.control}
          name='sgst'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px]'>SGST (%)</FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Enter SGST percentage'
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
        {/* IGST */}
        <FormField
          control={form.control}
          name='igst'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px]'>IGST (%)</FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Enter IGST percentage'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='mt-2 text-xs text-red-500' />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* UTGST */}
        <FormField
          control={form.control}
          name='utgst'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px]'>
                  UTGST (%)
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Enter UTGST percentage'
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
        {/* TDS */}
        <FormField
          control={form.control}
          name='tds'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px]'>TDS (%)</FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Enter TDS percentage'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='mt-2 text-xs text-red-500' />
                </div>
              </div>
            </FormItem>
          )}
        />
        {/* Discount */}
        <FormField
          control={form.control}
          name='discount'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px]'>
                  Discount (%)
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Enter Discount percentage'
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
