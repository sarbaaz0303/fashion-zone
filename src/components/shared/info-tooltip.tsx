import { InfoIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

type InfoTooltipProps = {
  align?: 'start' | 'center' | 'end';
  children: React.ReactNode;
};

export default function InfoTooltip({
  align = 'start',
  children,
}: InfoTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <InfoIcon className='h-4 w-4' />
        </TooltipTrigger>
        <TooltipContent align={align}>
          <p className='max-w-prose text-sm font-normal text-gray-500 dark:text-gray-400'>
            {children}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
