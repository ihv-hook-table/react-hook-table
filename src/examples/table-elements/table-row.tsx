import { TableRowProps, useLoadingContext } from '@/hook-table';
import { ComponentPropsWithoutRef } from 'react';
import { TableRow as CnTableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

type Props = ComponentPropsWithoutRef<'tr'> & TableRowProps;

export const TableRow = ({ className, ...props }: Props) => {
  const { isLoading } = useLoadingContext();

  return (
    <CnTableRow
      // Customize the row style when it is expanded.
      // Customize the row style when it is a subrow.
      className={cn(
        'data-[expanded=true]:bg-muted',
        'data-[expanded=true]:border-b-0',
        'data-[expanded=true]:hover:bg-muted',
        'data-[subrow=true]:bg-muted',
        'data-[subrow=true]:hover:bg-muted',
        className,
      )}
      data-loading={isLoading}
      {...props}
    />
  );
};
