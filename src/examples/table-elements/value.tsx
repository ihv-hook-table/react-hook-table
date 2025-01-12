import { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

// Overrides the default value component inside the td element

export const Value = ({
  isSecondaryValue,
  ...rest
}: ComponentProps<'div'> & {
  // If cell has more than one value, the secondary value can be styled differently if needed
  isSecondaryValue?: boolean;
}) => (
  <div
    className={cn(isSecondaryValue && 'text-muted-foreground text-xs')}
    {...rest}
  />
);
