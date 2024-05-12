import { z } from 'zod';

export const AuthFormSchema = (type: string) =>
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
        type === 'sign-in'
          ? z.string().optional()
          : z.string({ required_error: 'Please confirm your password.' }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (type !== 'sign-in' && confirmPassword !== password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Passwords do not match.',
          path: ['confirmPassword'],
        });
      }
    });
