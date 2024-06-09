'use client';

import * as React from 'react';

import { cn, getIcon } from '@/lib/utils';
import { Eye, EyeOff, type LucideProps } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  iconProps?: LucideProps;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconProps = {}, ...props }, ref) => {
    const [show, setShow] = React.useState(false);
    const { className: iconClassName, ...iconRest } = iconProps;
    const Icon = icon ? getIcon(icon) : '';
    return (
      <div className='relative w-full'>
        <input
          autoComplete='off'
          type={!show ? type : 'text'}
          className={cn(
            'peer flex h-10 w-full rounded-md border border-input bg-background px-4 py-2 pr-8 font-sans text-base text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-base placeholder:tracking-normal placeholder:text-gray-500 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-100',
            icon ? 'pl-8' : '',
            className,
          )}
          ref={ref}
          {...props}
        />
        {Icon && (
          <Icon
            size={16}
            className={cn(
              'pointer-events-none absolute left-1.5 top-1/2 -translate-y-1/2 transform text-muted-foreground peer-focus:text-ring',
              iconClassName,
            )}
            {...iconRest}
          />
        )}
        <button
          type='button'
          tabIndex={-1}
          onClick={() => setShow((prev) => !prev)}
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground peer-focus:text-ring',
            iconClassName,
          )}>
          {!show ? (
            <Eye size={16} {...iconRest} />
          ) : (
            <EyeOff size={16} {...iconRest} />
          )}
        </button>
      </div>
    );
  },
);

InputPassword.displayName = 'InputPassword';

export { InputPassword };
