import * as React from 'react';
import Image from 'next/image';

import { Input, InputProps } from '../ui/input';
import { Button } from '../ui/button';

import { cn } from '@/lib/utils';

interface CountryCodes {
  [key: string]: string;
}

const country: CountryCodes = {
  IN: 'india',
};

interface PhoneInputProps extends InputProps {
  defaultCountry: string;
  inputClassName?: string;
  iconClassName?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ defaultCountry, inputClassName, iconClassName, ...inputProps }, ref) => {
    return (
      <div className='flex'>
        <Button
          type='button'
          variant={'outline'}
          className={cn(
            'pointer-events-none flex gap-1 rounded-e-none rounded-s-lg px-3 hover:bg-background',
          )}>
          <Image
            src='/svg/flag-india.svg'
            alt={country[defaultCountry]}
            height={16}
            width={16}
            className={cn('no-select h-7 w-7', iconClassName)}
          />
        </Button>
        <Input
          className={cn('rounded-e-lg rounded-s-none', inputClassName)}
          {...inputProps}
          ref={ref}
        />
      </div>
    );
  },
);

PhoneInput.displayName = 'PhoneInput';
export default PhoneInput;
