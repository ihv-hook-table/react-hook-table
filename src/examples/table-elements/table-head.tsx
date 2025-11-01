import { ComponentProps, ComponentPropsWithRef } from 'react';
import { ColumnAlignmentProps, useSortingContext } from '@/hook-table';
import { TableHead as CnTableHead } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { cellAlignment } from './styles';
import {
  ArrowUpDown,
  LucideArrowDownWideNarrow,
  LucideArrowUpNarrowWide,
} from 'lucide-react';

type Props = ComponentPropsWithRef<'th'> &
  ColumnAlignmentProps & { accessor?: string; isSorting?: boolean };

const getIcon = (direction: 'asc' | 'desc' | 'none', isSorting?: boolean) => {
  if (isSorting) {
    switch (direction) {
      case 'asc':
        return <LucideArrowDownWideNarrow size={14} />;
      case 'desc':
        return <LucideArrowUpNarrowWide size={14} />;
      case 'none':
      default:
        return <ArrowUpDown size={14} />;
    }
  }

  return <ArrowUpDown size={14} />;
};

const TableHeadWrapper = ({
  children,
  alignment,
  isMultiValue,
  isSorting,
  ...rest
}: ComponentProps<'button'> &
  ColumnAlignmentProps & { isSorting: boolean }) => {
  const { sortDirection } = useSortingContext();
  return (
    <button {...rest}>
      <div
        className={cn(
          'flex gap-3 items-center',
          alignment === 'right' && 'flex-row-reverse',
        )}
      >
        <div
          className={cn(
            'text-nowrap',
            cellAlignment({ alignment, isMultiValue }),
          )}
        >
          {children}
        </div>
        {getIcon(sortDirection, isSorting)}
      </div>
    </button>
  );
};

export const TableHead = ({
  children,
  className,
  alignment,
  accessor,
  isMultiValue,
  ...props
}: Props) => {
  const { onSort, sortingEnabled, sortAccessor } = useSortingContext();

  return (
    <CnTableHead
      {...props}
      // Disable wrapping text in table head cells.
      // Add alignment props received from ihv/react-hook-table.
      className={cn(
        'text-nowrap h-min p-2',
        cellAlignment({ alignment, isMultiValue: false }),
        className,
      )}
    >
      {sortingEnabled && !!accessor ? (
        <TableHeadWrapper
          onClick={() => onSort(accessor)}
          isSorting={sortAccessor === accessor}
          alignment={alignment}
          isMultiValue={isMultiValue}
        >
          {children}
        </TableHeadWrapper>
      ) : (
        children
      )}
    </CnTableHead>
  );
};
