import { TableRowProps, useLoadingContext } from '@/hook-table';
import { ComponentPropsWithoutRef } from 'react';
import { TableRow as CnTableRow } from '@/components/ui/table';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type Props = ComponentPropsWithoutRef<'tr'> & TableRowProps;

const rowClasses = cva('', {
  variants: {
    subrow: {
      true: 'bg-muted hover:bg-muted [&>td>*]:bg-white [&>td>*]:rounded-sm [&>td>*]:border',
    },
    expanded: {
      true: 'bg-muted border-b-0 hover:bg-muted',
    },
  },
});

export const TableRow = ({ className, expanded, subrow, ...props }: Props) => {
  const { isLoading } = useLoadingContext();

  return (
    <CnTableRow
      // Customize the row style when it is expanded.
      // Customize the row style when it is a subrow.
      className={cn(rowClasses({ expanded, subrow }), className)}
      data-loading={isLoading}
      {...props}
    />
  );
};
