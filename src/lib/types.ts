import { z } from 'zod';

export enum AuthType {
  SignIn = 'sign-in',
  SignUp = 'sign-up',
}

export enum ResetAuthType {
  ForgotPassword = 'forgot-password',
  ResetPassword = 'reset-password',
}

export const AuthFormSchema = (type: AuthType) =>
  z
    .object({
      // Sign In & Sign Up
      email: z
        .string()
        .min(1, { message: 'Please enter your email address.' })
        .email({ message: 'Please enter a valid email address.' }),
      password: z
        .string()
        .min(1, { message: 'Please enter your password.' })
        .min(8, { message: 'Password must be at least 8 characters.' }),

      // Sign Up
      confirmPassword:
        type === AuthType.SignUp
          ? z.string({ required_error: 'Please confirm your password.' })
          : z.string().optional(),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (type === AuthType.SignUp && confirmPassword !== password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Passwords do not match.',
          path: ['confirmPassword'],
        });
      }
    });

export const ResetAuthFormSchema = (type: ResetAuthType) =>
  z.object({
    email:
      type === ResetAuthType.ForgotPassword
        ? z
            .string()
            .min(1, { message: 'Please enter your email address.' })
            .email({ message: 'Please enter a valid email address.' })
        : z.string().optional(),
    password:
      type === ResetAuthType.ResetPassword
        ? z
            .string()
            .min(1, { message: 'Please enter your password.' })
            .min(8, { message: 'Password must be at least 8 characters.' })
        : z.string().optional(),
  });

// Test
// export const PersonalInfoSchema = z.object({
//   first_name: z.string({ required_error: 'First name is required' }).min(1),
// });
export const AddressInfoSchema = z.object({
  address: z.string().min(1, { message: 'Address is required' }),
  city: z.string({ required_error: 'City is required' }).min(1),
  state: z.string({ required_error: 'State is required' }).min(1),
  country: z.string({ required_error: 'Country is required' }).min(1),
  postal: z.string({ required_error: 'Postal code is required' }).min(1),
});
export const CompanyInfoSchema = z.object({
  company_name: z.string().min(1, { message: 'Company name is required' }),
  invoice_isolation: z
    .string()
    .min(1, { message: 'Invoice isolation is required' }),
  invoice_id: z.string().min(1, { message: 'Invoice ID is required' }),
  gst: z.string().min(1, { message: 'GST is required' }),
  pan: z.string().min(1, { message: 'PAN is required' }),
  hsn: z.string().min(1, { message: 'HSN is required' }),
  discount_percentage: z
    .string()
    .min(1, { message: 'Discount percentage is required' }),
  tds_percentage: z.string().min(1, { message: 'TDS percentage is required' }),
  cgst_percentage: z
    .string()
    .min(1, { message: 'CGST percentage is required' }),
  sgst_percentage: z
    .string()
    .min(1, { message: 'SGST percentage is required' }),
});

// Define the schemas for each step
export const PersonalInfoSchema = z.object({
  first_name: z
    .string({ required_error: 'First name is required' })
    .min(1, { message: 'First name is required' }),
  last_name: z
    .string({ required_error: 'Last name is required' })
    .min(1, { message: 'Last name is required' }),
  gender: z
    .string({ required_error: 'Last name is required' })
    .min(1, { message: 'Last name is required' }),
  birth_date: z.date({ required_error: 'Birth date is required' }).refine(
    (date) => {
      const calculateAge = (date: Date) => {
        const diff = Date.now() - date.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      };

      const age = calculateAge(new Date(date));
      return age >= 18 && age <= 100;
    },
    {
      message: 'Age must be between 18 and 100 years',
    },
  ),
  email: z.string().email({ message: 'Invalid email address' }),
  // extension_1: z.string().optional(),
  phone_1: z.string().optional(),
  // extension_2: z.string().optional(),
  phone_2: z.string().optional(),
});

export const OnboardingFormSchema =
  PersonalInfoSchema.and(AddressInfoSchema).and(CompanyInfoSchema);
