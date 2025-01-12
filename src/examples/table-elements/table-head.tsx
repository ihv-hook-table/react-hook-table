import { ComponentPropsWithRef } from 'react';
import { ColumnAlignmentProps } from '@/hook-table';
import { TableHead as CnTableHead } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { cellAlignment } from './styles';

type Props = ComponentPropsWithRef<'th'> & ColumnAlignmentProps;

export const TableHead = ({
  className,
  alignment,
  isMultiValue,
  ...props
}: Props) => (
  <CnTableHead
    {...props}
    // Disable wrapping text in table head cells.
    // Add alignment props received from ihv/react-hook-table.
    className={cn(
      'text-nowrap',
      cellAlignment({ alignment, isMultiValue }),
      className,
    )}
  />
);
