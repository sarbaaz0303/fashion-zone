import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Lock, Mail } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
