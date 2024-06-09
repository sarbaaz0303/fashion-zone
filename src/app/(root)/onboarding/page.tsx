import OnboardingForm from '@/components/onboarding/onboarding-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onboarding',
};

export default async function OnboardingPage() {
  return (
    <section className='flex min-h-screen flex-col items-center justify-center p-2'>
      <OnboardingForm />
    </section>
  );
}
