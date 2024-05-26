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
export const PersonalInfoSchema = z.object({
  first_name: z.string({ required_error: 'First name is required' }).min(1),
});
export const AddressInfoSchema = z.object({
  city: z.string({ required_error: 'City is required' }).min(1),
});
export const CompanyInfoSchema = z.object({
  company_name: z.string({ required_error: 'Company name is required' }).min(1),
});

export const OnboardingFormSchema =
  PersonalInfoSchema.merge(AddressInfoSchema).merge(CompanyInfoSchema);

// Define the schemas for each step
export const PersonalInfoSchema1 = z.object({
  first_name: z.string({ required_error: 'First name is required' }),
  last_name: z.string({ required_error: 'Last name is required' }),
  gender: z.string({ required_error: 'Last name is required' }),
  birth_date: z.string({ required_error: 'Birth date is required' }).refine(
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
  // extension_1: z.string(),
  phone_1: z.string().optional(),
  // extension_2: z.string(),
  phone_2: z.string().optional(),
});
