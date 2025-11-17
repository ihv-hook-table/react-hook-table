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
  wrap,
  ...props
}: Props) => (
  <CnTableCell
    {...props}
    // Assign alignment classes based on props received from ihv/react-hook-table.
    // expandable - adjust styles when column is expandable.
    className={cn(
      cellAlignment({
        alignment,
        isMultiValue: !expandable && isMultiValue,
      }),
      cellClasses({ expandable, wrap }),
      'data-[subrow=true]:pt-0',
      className,
    )}
  />
);
