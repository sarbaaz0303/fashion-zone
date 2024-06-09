'use client';

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitErrorHandler, useForm } from 'react-hook-form';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Form } from '../ui/form';
import { Button } from '../ui/button';
import Loading from '../shared/loading';

import StepperHeader from './stepper-header';
import PersonalInformation from './personal-information';
import AddressInformation from './address-information';
import CompanyInformation from './company-information';

import { getZodSchemaFields, sleep } from '@/lib/utils';

import {
  AddressInformationSchema,
  OnboardingFormSchema,
  PersonalInformationSchema,
} from '@/lib/zod/onboarding-schema';
import { onboardingData } from '@/lib/static/main-data';

export default function OnboardingForm() {
  const [step, setStep] = useState(0);
  const [stepData, setStepData] = useState(onboardingData);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = OnboardingFormSchema;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Personal Information Schema
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: undefined,
      email: '',
      phone1: '',
      phone2: '',

      // Address Information Schema
      address: '',

      // Company Information Schema
      companyName: '',
    },
  });

  // 2. Handle the form submission.
  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    console.log(formData);

    setIsLoading(true);
    setStepData((prevData) =>
      prevData.map((item, index) =>
        index === step ? { ...item, status: 'success' } : item,
      ),
    );
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
    setStepData((prevData) =>
      prevData.map((item, index) =>
        index === step ? { ...item, status: 'failed' } : item,
      ),
    );
    console.error(error);
  };

  const onClickNext = async () => {
    try {
      const currentSchema =
        step === 0 ? PersonalInformationSchema : AddressInformationSchema;
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

  const onClickBack = async () => {
    setStepData((prevData) =>
      prevData.map((item, index) =>
        index === step ? { ...item, status: '' } : item,
      ),
    );
    setStep((step) => step - 1);
  };

  return (
    <Card className='w-full max-w-2xl '>
      <section className='flex flex-col space-y-1.5 p-6'>
        <StepperHeader steps={stepData} />
      </section>
      <CardHeader className='px-6 pt-2'>
        <CardTitle className='text-2xl font-medium'>
          {stepData[step].name} Information
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onFormError)}
          className='space-y-8'>
          <CardContent className='px-6'>
            {step === 0 && <PersonalInformation form={form} />}
            {step === 1 && <AddressInformation form={form} />}
            {step === 2 && <CompanyInformation form={form} />}
          </CardContent>

          <CardFooter className='flex justify-between px-6'>
            {/* Handle click back */}
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
            {step !== 2 && (
              <Button type='button' onClick={onClickNext} className='sm:w-1/5'>
                Next
              </Button>
            )}

            {/* Handle form submit */}
            {step === 2 && (
              <Button
                type='submit'
                disabled={isLoading}
                className='text-slate-50 sm:w-1/5'>
                {isLoading ? <Loading /> : 'Submit'}
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
