import { z } from 'zod';

export const PersonalInformationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: 'First name is required' })
    .max(50, { message: 'First name is too long' }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: 'Last name is required' })
    .max(50, { message: 'Last name is too long' })
    .optional(),
  birthDate: z.date({ message: 'Date of birth is required' }).refine(
    (date) => {
      const ageDate = new Date(Date.now() - date.getTime());
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      return age >= 18 && age <= 100;
    },
    { message: 'Individual age must be between 18 and 100 years' },
  ),
  gender: z.string().refine(
    (gender) => {
      return ['male', 'female', 'other', 'no-answer'].includes(gender);
    },
    {
      message: 'Please provide your gender',
    },
  ),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Please enter your email address.' })
    .email({ message: 'Please enter a valid email address.' }),
  phone1: z
    .string()
    .trim()
    .regex(/^\+?\d{1,3}[- ]?\d{9,}$/, {
      message: 'Please enter a valid phone number',
    })
    .max(20, { message: 'Phone number is too long' })
    .optional(),
  phone2: z
    .string()
    .trim()
    .regex(/^\+?\d{1,3}[- ]?\d{9,}$/, {
      message: 'Please enter a valid phone number',
    })
    .max(20, { message: 'Phone number is too long' })
    .optional(),
});

export const AddressInformationSchema = z.object({
  address: z.string().trim().min(1, { message: 'Address is required' }),
  city: z.string().trim().min(1, {message: 'City is required'}),
  state: z.string().trim().min(1, {message: 'State is required'}),
  country: z.string().trim().min(1, {message: 'Country is required'}),
  postalCode: z.string().trim().min(1, {message: 'Postal code is required'})
});

export const CompanyInformationSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, { message: 'Company name is required' })
    .max(100, { message: 'Company name is too long' }),
});

export const OnboardingFormSchema = PersonalInformationSchema.and(
  AddressInformationSchema,
).and(CompanyInformationSchema);
