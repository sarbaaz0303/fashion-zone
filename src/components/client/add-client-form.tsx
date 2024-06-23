'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitErrorHandler, UseFormReturn, useForm } from 'react-hook-form';

import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
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
import { Textarea } from '../ui/textarea';

import { useApp } from '../providers/app-provider';
import PhoneInput from '../shared/phone-input';
import Loading from '../shared/loading';

import { ClientBasicDetailSchema, ClientSchema } from '@/lib/zod/client-schema';
import { getZodSchemaFields } from '@/lib/utils';
import { clientData } from '@/lib/static/main-data';
import StepperHeader from '../onboarding/stepper-header';

export default function AddClientForm() {
  const { state } = useApp() || {};
  const { user } = state || {};

  const [step, setStep] = useState(0);
  const [stepData, setStepData] = useState(clientData);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = ClientSchema;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceId: '',
      name: '',
      gst: '',
      pan: '',
      email: '',
      phone1: '',
      phone2: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    },
  });

  useEffect(() => {
    const setPanValue = () => {
      const {
        formState: { dirtyFields },
      } = form;

      if (dirtyFields?.pan) {
        return;
      }

      const gstNumber = form.getValues('gst');
      if (gstNumber) {
        form.setValue('pan', gstNumber.slice(2, 12));
      }
    };
    setPanValue();
  }, [form.watch('gst')]);

  // 2. Handle the form submission.
  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setStepData((prevData) =>
      prevData.map((item, index) =>
        index === step ? { ...item, status: 'success' } : item,
      ),
    );
    try {
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
    setStepData((prevData) =>
      prevData.map((item, index) =>
        index === step ? { ...item, status: 'failed' } : item,
      ),
    );
    console.error(error);
  };

  // Handle click Next
  const onClickNext = async () => {
    try {
      const currentSchema = ClientBasicDetailSchema;
      const schemaFields = getZodSchemaFields(currentSchema);

      // @ts-ignore
      const isSchemaValid = await form.trigger(schemaFields);

      if (isSchemaValid) {
        setStepData((prevData) =>
          prevData.map((item, index) =>
            index === step ? { ...item, status: 'success' } : item,
          ),
        );
        setStep((prevStep) => prevStep + 1);
        return;
      }

      setStepData((prevData) =>
        prevData.map((item, index) =>
          index === step ? { ...item, status: 'failed' } : item,
        ),
      );
    } catch (error) {
      console.error('Error while handling next click:', error);
    }
  };

  // Handle click Back
  const onClickBack = async () => {
    setStepData((prevData) =>
      prevData.map((item, index) =>
        index === step ? { ...item, status: '' } : item,
      ),
    );
    setStep((step) => step - 1);
  };

  return (
    <section className='space-y-4 px-4 sm:space-y-6'>
      <DialogHeader>
        <DialogTitle className='text-center'>Add New Client</DialogTitle>
      </DialogHeader>
      <section className='w-2/3'>
        <StepperHeader steps={stepData} />
      </section>
      <section>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onFormError)}
            className='space-y-4'>
            {step === 0 && (
              <ClientBasicDetails
                form={form}
                sequentialInvoice={user?.sequential_invoice}
              />
            )}
            {step === 1 && <ClientAddress form={form} />}

            <DialogFooter>
              {step === 0 ? (
                <div></div>
              ) : (
                <Button
                  type='button'
                  variant='outline'
                  disabled={isLoading}
                  onClick={onClickBack}
                  className='sm:w-1/5'>
                  Back
                </Button>
              )}

              {/* Handle click next */}
              {step !== 1 && (
                <Button
                  type='button'
                  onClick={onClickNext}
                  className='sm:w-1/5'>
                  Next
                </Button>
              )}

              {/* Handle form submit */}
              {step === 1 && (
                <Button
                  type='submit'
                  disabled={isLoading}
                  className='text-slate-50 sm:w-1/5'>
                  {isLoading ? <Loading /> : 'Submit'}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </section>
    </section>
  );
}

type ClientBasicDetailsProps = {
  form: UseFormReturn<z.infer<typeof ClientSchema>>;
  sequentialInvoice?: boolean | undefined;
};
function ClientBasicDetails({
  form,
  sequentialInvoice,
}: ClientBasicDetailsProps) {
  return (
    <>
      {!sequentialInvoice && (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
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
                        placeholder='Enter Invoice id'
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
      )}
      <div className='grid grid-cols-1 gap-4'>
        {/* Client Name */}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px] text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Client Name
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Client Name'
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
                      className='uppercase placeholder:capitalize'
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
                      className='uppercase placeholder:capitalize'
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
        {/* Email */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px]'>Email</FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='you@example.com'
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
        {/* Phone Number 1 */}
        <FormField
          name='phone1'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px]'>
                  Mobile Number 1
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <PhoneInput
                      placeholder='Enter client phone number'
                      defaultCountry='IN'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='mt-2 text-xs text-red-500' />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* Phone Number 2 */}
        <FormField
          name='phone2'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col gap-1.5'>
                <FormLabel className='w-full max-w-[280px]'>
                  Mobile Number 2
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <PhoneInput
                      placeholder='Enter client phone number'
                      defaultCountry='IN'
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
    </>
  );
}

type ClientAddressProps = {
  form: UseFormReturn<z.infer<typeof ClientSchema>>;
};

function ClientAddress({ form }: ClientAddressProps) {
  return (
    <>
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
                      placeholder='Enter client address'
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
    </>
  );
}
