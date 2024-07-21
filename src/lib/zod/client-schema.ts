import { z } from 'zod';

export const ClientBasicDetailSchema = z.object({
  invoiceId: z
    .string({ required_error: 'Invoice ID is required' })
    .trim()
    .min(1, { message: 'Invoice ID is required' })
    .optional()
    .or(z.literal('')),
  name: z
    .string({ required_error: 'Company name is required' })
    .trim()
    .min(1, { message: 'Company name is required' })
    .max(100, { message: 'Company name is too long' }),
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
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .min(1, { message: 'Please enter company email address.' })
    .email({ message: 'Please enter a valid email address.' })
    .optional()
    .or(z.literal('')),
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

export const ClientAddressSchema = z.object({
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

export const ClientSchema = ClientBasicDetailSchema.and(ClientAddressSchema);
