import { ComponentPropsWithRef } from 'react';
import { TableBody as CnTableBody } from '@/components/ui/table';
import { cn } from '@/lib/utils';

type TableBodyProps = ComponentPropsWithRef<'tbody'>;

export const TableBody = ({ className, ...props }: TableBodyProps) => (
  <CnTableBody
    className={cn(
      // Override shadcn/ui table body css to be more specific. Maybe there is better way to do this.
      '[&_tr:last-child]:border-b [&&>tr:last-child]:border-0',
      className,
    )}
    {...props}
  />
);
