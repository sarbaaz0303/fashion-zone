import { Fragment } from 'react';
import { cn } from '@/lib/utils';

import CircleCheckIcon from '@/assets/tsx-svg/circle-check';
import CircleAlertIcon from '@/assets/tsx-svg/circle-alert';

type StepperHeaderProps = {
  steps: { name: string; status: string }[];
};
export default function StepperHeader({ steps }: StepperHeaderProps) {
  return (
    <nav>
      <ol className='flex w-full items-center justify-between text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:flex-row sm:text-base'>
        {steps.map((step, index) => (
          <Fragment key={index}>
            <li
              className={cn('flex items-center', {
                'text-primary': step.status === 'success',
                'text-red-500': step.status === 'failed',
              })}>
              <span className='flex items-center'>
                <span className='hidden sm:me-2 sm:block'>
                  {step.status === 'success' ? (
                    <CircleCheckIcon className='me-2.5 h-3.5 w-3.5 sm:h-5 sm:w-5' />
                  ) : step.status === 'failed' ? (
                    <CircleAlertIcon className='me-2.5 h-3.5 w-3.5 sm:h-5 sm:w-5' />
                  ) : (
                    index + 1
                  )}
                </span>
                {step.name}
                {index !== steps.length - 1 && (
                  <span className='hidden sm:ms-2 sm:inline-flex'>Info</span>
                )}
              </span>
            </li>
            {/* Horizontal Divider */}
            {index !== steps.length - 1 && (
              <div className="grow text-gray-200 after:content-['/'] dark:text-gray-700 sm:mx-3 sm:border-b-2 sm:border-gray-200 sm:after:hidden sm:dark:border-gray-700"></div>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
