import { ComponentPropsWithRef } from 'react';
import { cva } from 'class-variance-authority';
import { TableDataProps } from '@/hook-table';

import { TableCell as CnTableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { cellAlignment } from './styles';

const cellClasses = cva('', {
  variants: {
    expandable: {
      true: 'p-0',
    },
    isSubRow: {
      true: 'bg-white, border-bottom-0 pt-0',
    },
    wrap: {
      true: 'text-wrap',
      false: 'text-nowrap',
    },
  },
  defaultVariants: {
    wrap: false,
  },
});

type Props = ComponentPropsWithRef<'td'> & TableDataProps;

export const TableData = ({
  alignment,
  className,
  expandable,
  isMultiValue,
  isSubRow,
  wrap,
  ...props
}: Props) => (
  <CnTableCell
    {...props}
    // Assign alignment classes based on props received from ihv/react-hook-table.
    // expandable - adjust styles when column is expandable.
    className={cn(
      cellAlignment({ alignment, isMultiValue }),
      cellClasses({ expandable, isSubRow, wrap }),
      className,
    )}
  />
);
