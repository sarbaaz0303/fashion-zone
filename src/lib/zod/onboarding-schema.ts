import { z } from 'zod';

export const PersonalInformationSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .trim()
    .min(1, { message: 'First name is required' })
    .max(50, { message: 'First name is too long' }),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .trim()
    .min(1, { message: 'Last name is required' })
    .max(50, { message: 'Last name is too long' })
    .optional()
    .or(z.literal('')),
  birthDate: z.date({ message: 'Date of birth is required' }).refine(
    (date) => {
      const ageDate = new Date(Date.now() - date.getTime());
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      return age >= 18 && age <= 100;
    },
    { message: 'Individual age must be between 18 and 100 years' },
  ),
  gender: z.string({ required_error: 'Please provide your gender' }).refine(
    (gender) => {
      return ['male', 'female', 'other', 'no-answer'].includes(gender);
    },
    {
      message: 'Please provide your gender',
    },
  ),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .min(1, { message: 'Please enter your email address.' })
    .email({ message: 'Please enter a valid email address.' }),
  phone1: z
    .string({ required_error: 'Mobile number 1 is required' })
    .trim()
    .regex(/^\+?\d{1,3}[- ]?\d{9,}$/, {
      message: 'Please enter a valid phone number',
    })
    .max(20, { message: 'Phone number is too long' })
    .optional()
    .or(z.literal('')),
  phone2: z
    .string({ required_error: 'Mobile number 2 is required' })
    .trim()
    .regex(/^\+?\d{1,3}[- ]?\d{9,}$/, {
      message: 'Please enter a valid phone number',
    })
    .max(20, { message: 'Phone number is too long' })
    .optional()
    .or(z.literal('')),
});

export const CompanyInformationSchema = z.object({
  companyName: z
    .string({ required_error: 'Company name is required' })
    .trim()
    .min(1, { message: 'Company name is required' })
    .max(100, { message: 'Company name is too long' }),
  sequentialInvoice: z
    .string({ required_error: 'Sequential Invoice is required' })
    .trim()
    .min(1, {
      message: 'Sequential Invoice is required',
    }),
  invoiceId: z
    .string({ required_error: 'Invoice ID is required' })
    .trim()
    .min(1, { message: 'Invoice ID is required' }),
  hsnCode: z
    .string({ required_error: 'HSN is required' })
    .trim()
    .min(1, { message: 'HSN is required' })
    .min(4, {
      message: 'Invalid HSN Code',
    })
    .max(8, { message: 'Invalid HSN Code' }),
  gst: z
    .string({ required_error: 'GST is required' })
    .trim()
    .min(15, { message: 'GST is required' })
    .max(15, { message: 'Invalid GST Number' }),
  pan: z
    .string({ required_error: 'PAN is required' })
    .trim()
    .min(10, { message: 'PAN is required' })
    .max(10, { message: 'Invalid PAN Number' }),
  sgst: z
    .string({ required_error: 'SGST is required' })
    .trim()
    .min(1, { message: 'SGST is required' })
    .refine(
      (data) => {
        return Number(data) >= 0 && Number(data) <= 100;
      },
      {
        message: 'Invalid SGST Percentage',
      },
    ),
  cgst: z
    .string({ required_error: 'CGST is required' })
    .trim()
    .min(1, { message: 'CGST is required' })
    .refine(
      (data) => {
        return Number(data) >= 0 && Number(data) <= 100;
      },
      {
        message: 'Invalid CGST Percentage',
      },
    ),
  igst: z
    .string({ required_error: 'IGST is required' })
    .trim()
    .min(1, { message: 'IGST is required' })
    .refine(
      (data) => {
        return Number(data) >= 0 && Number(data) <= 100;
      },
      {
        message: 'Invalid IGST Percentage',
      },
    )
    .optional()
    .or(z.literal('')),
  utgst: z
    .string({ required_error: 'UTGST is required' })
    .trim()
    .min(1, { message: 'UTGST is required' })
    .refine(
      (data) => {
        return Number(data) >= 0 && Number(data) <= 100;
      },
      {
        message: 'Invalid UTGST Percentage',
      },
    )
    .optional()
    .or(z.literal('')),
  tds: z
    .string({ required_error: 'TDS is required' })
    .trim()
    .min(1, { message: 'TDS is required' })
    .refine(
      (data) => {
        return Number(data) >= 0 && Number(data) <= 100;
      },
      {
        message: 'Invalid TDS Percentage',
      },
    ),
  discount: z
    .string({ required_error: 'Discount is required' })
    .trim()
    .min(1, { message: 'Discount is required' })
    .refine(
      (data) => {
        return Number(data) >= 0 && Number(data) <= 100;
      },
      {
        message: 'Invalid Discount Percentage',
      },
    )
    .optional()
    .or(z.literal('')),
});

export const CompanyAddressSchema = z.object({
  address: z
    .string({ required_error: 'Address is required' })
    .trim()
    .min(1, { message: 'Address is required' }),
  city: z
    .string({ required_error: 'City is required' })
    .trim()
    .min(1, { message: 'City is required' }),
  state: z
    .string({ required_error: 'State is required' })
    .trim()
    .min(1, { message: 'State is required' }),
  country: z
    .string({ required_error: 'Country is required' })
    .trim()
    .min(1, { message: 'Country is required' }),
  postalCode: z
    .string({ required_error: 'Postal code is required' })
    .trim()
    .min(1, { message: 'Postal code is required' }),
});

export const OnboardingFormSchema = PersonalInformationSchema.and(
  CompanyInformationSchema,
).and(CompanyAddressSchema);
