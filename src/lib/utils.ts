import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Lock, Mail } from 'lucide-react';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getZodSchemaFields = (schema: z.infer<any>) =>
  Object.entries(schema.shape).map((items) => items[0]);

export const getCalendarDate = (
  date: string,
  defaultDate: Date = new Date('2000-01-01'),
) => {
  if (date) {
    return new Date(date);
  }
  return defaultDate;
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getIcon(name: string | undefined) {
  switch (name) {
    case 'Mail':
      return Mail;

    default:
      return Lock;
  }
}

export function extractPhoneParts(phoneNumber: string | undefined) {
  const pattern = /^(?:(\+\d{1,3})\s?)?(\d{10})$/;

  if (!phoneNumber) {
    return { countryCode: '', mainNumber: '' };
  }

  const match = phoneNumber.match(pattern);

  if (match) {
    const countryCode = match[1] ? match[1] : '';
    const mainNumber = match[2];
    return { countryCode, mainNumber };
  } else {
    return { countryCode: '', mainNumber: phoneNumber };
  }
}
