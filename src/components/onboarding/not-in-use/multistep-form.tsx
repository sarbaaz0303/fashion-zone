import { UseFormReturn } from 'react-hook-form';
import { US, IN, CA, GB, AU } from 'country-flag-icons/react/3x2';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { z } from 'zod';
import { OnboardingFormSchema } from '@/lib/types';
import { Input } from '../../ui/input';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Button } from '../../ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon, ChevronDownIcon, Info } from 'lucide-react';
import { Calendar } from '../../shared/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Label } from '../../ui/label';
import { PhoneInput } from '../../ui/not-in-use/phone-input';
import { Textarea } from '../../ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui/tooltip';

export function PersonalInfo({
  form,
}: {
  form: UseFormReturn<z.infer<typeof OnboardingFormSchema>>;
}) {
  return (
    <div className='grid gap-6'>
      <div className='grid gap-2'>
        <h3 className='text-xl'>Personal Information</h3>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
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
          name='last_name'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Last Name
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Last Name'
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
        <FormField
          control={form.control}
          name='birth_date'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Date of Birth
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal hover:bg-secondary',
                          !field.value && 'text-muted-foreground',
                        )}>
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar onChange={field.onChange} value={field.value} />
                  </PopoverContent>
                </Popover>
                <FormMessage className='mt-2 text-xs text-red-500' />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='gender'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Gender
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        className='font-sans text-base text-gray-900 placeholder:text-base placeholder:text-gray-500 dark:text-gray-100'
                        placeholder='Select Gender'
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='male'>Male</SelectItem>
                    <SelectItem value='female'>Female</SelectItem>
                    <SelectItem value='other'>Other</SelectItem>
                    <SelectItem value='no-answer'>Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className='mt-2 text-xs text-red-500' />
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className='grid gap-4'>
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
                      placeholder='Enter your email'
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
        <FormField
          name='phone_1'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                Mobile Number 1
              </FormLabel>
              <FormControl>
                <PhoneInput
                  placeholder='Enter a phone number'
                  defaultCountry='IN'
                  {...field}
                />
              </FormControl>
              <FormMessage className='mt-2 text-xs text-red-500' />
            </FormItem>
          )}
        />
        <FormField
          name='phone_2'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                Mobile Number 2
              </FormLabel>
              <FormControl>
                <PhoneInput
                  placeholder='Enter a phone number'
                  defaultCountry='IN'
                  {...field}
                />
              </FormControl>
              <FormMessage className='mt-2 text-xs text-red-500' />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export function AddressInfo({
  form,
}: {
  form: UseFormReturn<z.infer<typeof OnboardingFormSchema>>;
}) {
  return (
    <div className='grid gap-6'>
      <div className='grid gap-2'>
        <h3 className='text-xl'>Residential Information</h3>
      </div>
      <div className='grid gap-4'>
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Address
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter Address'
                    className='resize-none font-sans text-base text-gray-900 placeholder:text-base placeholder:text-gray-500 dark:text-gray-100'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='mt-2 text-xs text-red-500' />
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
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
                    <Input
                      type='text'
                      placeholder='State'
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
                    <Input
                      type='text'
                      placeholder='Country'
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
          name='postal'
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
                      placeholder='Postal Code'
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
    </div>
  );
}

export function CompanyInfo({
  form,
}: {
  form: UseFormReturn<z.infer<typeof OnboardingFormSchema>>;
}) {
  return (
    <div className='grid gap-6'>
      <div className='grid gap-2'>
        <h3 className='text-xl'>Company Information</h3>
      </div>
      <div className='grid gap-4'>
        <FormField
          control={form.control}
          name='company_name'
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
        <FormField
          control={form.control}
          name='invoice_isolation'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='flex w-full max-w-[280px] items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
                  <p>Invoice Isolation</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className='h-4 w-4' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Should New Client invoices starts with a new invoice
                          id
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          className='font-sans text-base text-gray-900 placeholder:text-base placeholder:text-gray-500 dark:text-gray-100'
                          placeholder='Invoice Isolation'
                        />
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
        <FormField
          control={form.control}
          name='invoice_id'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Invoice ID
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Invoice ID'
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
        <FormField
          control={form.control}
          name='gst'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                  GST Number
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='GST Number'
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
          name='pan'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                  PAN Number
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='PAN Number'
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
        <FormField
          control={form.control}
          name='hsn'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                  HSN Number
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='HSN Number'
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
        <FormField
          control={form.control}
          name='cgst_percentage'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Ccgst Number
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Ccgst Number'
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
          name='sgst_percentage'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                  SGST Number
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='SGST Number'
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
        <FormField
          control={form.control}
          name='tds_percentage'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                  TDS Percentage
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='TDS Percentage'
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
          name='discount_percentage'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Discount Percentage
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Discount Percentage'
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
    </div>
  );
}
