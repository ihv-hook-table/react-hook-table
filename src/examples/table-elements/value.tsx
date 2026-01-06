import { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

// Overrides the default value component inside the td element

export const Value = (props: ComponentProps<'div'>) => (
  <div
    className={cn(
      'data-[secondary=true]:text-muted-foreground',
      'data-[secondary=true]:text-xs',
      'data-[secondary=true]:font-normal',
    )}
    {...props}
  />
);
