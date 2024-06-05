import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';

type LoadingProps = {
  size?: number;
  className?: string;
};

export default function Loading({ size = 20, className = '' }: LoadingProps) {
  return (
    <>
      <Loader2Icon size={size} className={cn('animate-spin', className)} />
      &nbsp; Loading...
    </>
  );
}
