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
} from './ui/card';
import { Button } from './ui/button';
import { Form } from './ui/form';
import { Loader2 } from 'lucide-react';
import { AddressInfo, CompanyInfo, PersonalInfo } from './multistep-form';

export default function OnboardingForm() {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = OnboardingFormSchema;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      city: '',
      company_name: '',
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
    const schema =
      step == 0 ? 'first_name' : step == 1 ? 'city' : 'company_name';

    if (await form.trigger(schema)) {
      setStep((prev) => prev + 1);
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
