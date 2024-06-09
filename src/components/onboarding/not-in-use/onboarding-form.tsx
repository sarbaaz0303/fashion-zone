'use client';

import {
  AddressInfoSchema,
  CompanyInfoSchema,
  OnboardingFormSchema,
  PersonalInfoSchema,
} from '@/lib/types';
import { sleep } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { AddressInfo, CompanyInfo, PersonalInfo } from './multistep-form';

export default function OnboardingForm() {
  const [step, setStep] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = OnboardingFormSchema;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      gender: '',
      birth_date: new Date('2000-01-01'),
      email: '',
      phone_1: '',
      phone_2: '',

      address: '',
      city: '',
      state: '',
      country: '',
      postal: '',

      company_name: '',
      invoice_isolation: '',
      invoice_id: '',
      gst: '',
      pan: '',
      hsn: '',
      discount_percentage: '',
      tds_percentage: '',
      cgst_percentage: '',
      sgst_percentage: '',
    },
  });

  // 2. Handle the form submission.
  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    console.log(formData);

    setIsLoading(true);
    try {
    } catch (error) {
    } finally {
      await sleep(3000);
      setIsLoading(false);
    }
  };

  // 3.On Form Error
  const onFormError: SubmitErrorHandler<z.infer<typeof formSchema>> = (
    error,
  ) => {
    console.error(error);
  };

  const onNext = async () => {
    try {
      // Select schema based on current step
      const schema =
        step === 0
          ? PersonalInfoSchema
          : step === 1
            ? AddressInfoSchema
            : CompanyInfoSchema;

      // Extract form field names from schema
      const entries: string[] = Object.entries(schema.shape).map(
        (items) => items[0],
      );

      // Log the entries for debugging
      console.log('Validating fields:', entries);

      // Trigger validation on the form
      // @ts-ignore
      const isValid = await form.trigger(entries);

      // If validation passes, move to the next step
      if (isValid) {
        setStep((prev) => prev + 1);
      } else {
        console.error('Validation failed for fields:', entries);
      }
    } catch (error) {
      console.error('Error in onNext function:', error);
    }
  };

  return (
    <>
      <Card className='w-full max-w-2xl'>
        <CardHeader className='gap-0 sm:gap-2'>
          <CardTitle className='text-base sm:text-2xl'>
            User Onboarding
          </CardTitle>
          <CardDescription className='text-xs sm:text-base'>
            Fill out the following steps to start your journey.
          </CardDescription>
        </CardHeader>
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onFormError)}
              className='space-y-8'>
              <CardContent>
                {step === 0 && <PersonalInfo form={form} />}
                {step === 1 && <AddressInfo form={form} />}
                {step === 2 && <CompanyInfo form={form} />}
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button
                  type='button'
                  variant='outline'
                  disabled={step == 0 || isLoading}
                  onClick={() => setStep((prev) => prev - 1)}
                  className='hover:bg-secondary sm:w-1/5'>
                  Previous
                </Button>
                {step < 2 && (
                  <Button type='button' onClick={onNext} className='sm:w-1/5'>
                    Next
                  </Button>
                )}
                {step == 2 && (
                  <Button
                    type='submit'
                    disabled={isLoading}
                    className='text-slate-50 sm:w-1/5'>
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className='animate-spin' /> &nbsp;
                        Loading...
                      </>
                    ) : (
                      'Submit'
                    )}
                  </Button>
                )}
              </CardFooter>
            </form>
          </Form>
        </>
      </Card>
    </>
  );
}
