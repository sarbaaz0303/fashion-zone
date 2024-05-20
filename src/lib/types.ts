import { z } from 'zod';

export enum AuthType {
  SignIn = 'sign-in',
  SignUp = 'sign-up',
}

export const EmailOnlySchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email address.' })
    .email({ message: 'Please enter a valid email address.' }),
});

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
