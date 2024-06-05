import { z } from 'zod';

// Types
export enum AuthType {
  SignIn = 'sign-in',
  SignUp = 'sign-up',
}

export enum ResetAuthType {
  ForgotPassword = 'forgot-password',
  ResetPassword = 'reset-password',
}

// Schema
export const SignInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Please enter your email address.' })
    .email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .trim()
    .min(1, { message: 'Please enter your password.' })
    .min(8, { message: 'Password must be at least 8 characters.' }),
});

export const SignUpSchema = SignInSchema.extend({
  confirmPassword: z
    .string()
    .trim()
    .min(1, { message: 'Please confirm your password.' })
    .min(8, { message: 'Password must be at least 8 characters.' }),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Passwords do not match.',
      path: ['confirmPassword'],
    });
  }
});

export const AuthFormSchema = (type: AuthType) =>
  type === AuthType.SignIn ? SignInSchema : SignUpSchema;

export const ResetFormSchema = (type: ResetAuthType) =>
  type === ResetAuthType.ForgotPassword
    ? GetPasswordResetMailSchema
    : ResetPasswordSchema;

export const GetPasswordResetMailSchema = SignInSchema.pick({ email: true });

export const ResetPasswordSchema = SignInSchema.pick({ password: true });
