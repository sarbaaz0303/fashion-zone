'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

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
import { ButtonCloseIcon } from '../shared/button-close-icon';

import StepperHeader from './stepper-header';
import PersonalInformation from './personal-information';
import CompanyAddress from './company-address';
import CompanyInformation from './company-information';

import { createClient } from '@/lib/supabase/client';
import { getZodSchemaFields } from '@/lib/utils';
import {
  CompanyInformationSchema,
  OnboardingFormSchema,
  PersonalInformationSchema,
} from '@/lib/zod/onboarding-schema';

import { onboardingData } from '@/lib/static/main-data';
import { format } from 'date-fns';

export default function OnboardingForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [stepData, setStepData] = useState(onboardingData);
  const [isLoading, setIsLoading] = useState(false);
  const [disableEmail, setDisableEmail] = useState(false);

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

      // Company Information Schema
      companyName: '',
      sequentialInvoice: '',
      invoiceId: '',
      hsnCode: '',
      gst: '',
      pan: '',
      cgst: '',
      sgst: '',
      igst: '',
      utgst: '',
      tds: '',
      discount: '',

      // Company Address Schema
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

  useEffect(() => {
    const getEmail = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('users')
          .select('first_name, last_name, email, phone')
          .single();

        if (data) {
          form.setValue('firstName', data?.first_name || '');
          form.setValue('lastName', data?.last_name || '');
          form.setValue('email', data?.email || '');
          form.setValue('phone1', data?.phone || '');

          setDisableEmail(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getEmail();
  }, []);

  // 2. Handle the form submission.
  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setStepData((prevData) =>
      prevData.map((item, index) =>
        index === step ? { ...item, status: 'success' } : item,
      ),
    );

    try {
      const response = await fetch('/api/onboard-user', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          birthDate: format(formData.birthDate, 'dd/MM/yyyy'),
        }),
      });

      const jsonResponse = await response.json();

      if (jsonResponse.error?.code) {
        const uuid = crypto.randomUUID();
        toast.error(jsonResponse.error.message, {
          id: uuid,
          action: <ButtonCloseIcon toastId={uuid} />,
        });

        console.error(jsonResponse.error?.code);
      }

      if (jsonResponse.data?.redirect) {
        const uuid = crypto.randomUUID();
        toast.success('User Onboarded Successfully', {
          id: uuid,
          action: <ButtonCloseIcon toastId={uuid} />,
        });

        router.push(jsonResponse.data.redirect);
      }
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
      const currentSchema =
        step === 0 ? PersonalInformationSchema : CompanyInformationSchema;
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
    <Card className='w-full max-w-2xl '>
      <section className='flex flex-col space-y-1.5 p-6'>
        <StepperHeader steps={stepData} />
      </section>
      <CardHeader className='px-6 pt-2'>
        <CardTitle className='text-2xl font-medium'>
          {stepData[step].name} {step !== 2 && 'Information'}
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onFormError)}
          className='space-y-8'>
          <CardContent className='px-6'>
            {step === 0 && (
              <PersonalInformation form={form} disableEmail={disableEmail} />
            )}
            {step === 1 && <CompanyInformation form={form} />}
            {step === 2 && <CompanyAddress form={form} />}
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
