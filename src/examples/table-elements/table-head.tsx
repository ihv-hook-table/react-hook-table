import { ComponentProps, ComponentPropsWithRef } from 'react';
import { ColumnAlignmentProps, useSortingContext } from '@/hook-table';
import { TableHead as CnTableHead } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { cellAlignment } from './styles';
import {
  ArrowUpDown,
  LucideArrowDownNarrowWide,
  LucideArrowUpWideNarrow,
} from 'lucide-react';

type Props = ComponentPropsWithRef<'th'> &
  ColumnAlignmentProps & {
    isSorting?: boolean;
    sortAccessor?: string;
  };

const getIcon = (direction: 'asc' | 'desc' | 'none', isSorting?: boolean) => {
  switch (direction) {
    case 'asc':
      return (
        <LucideArrowDownNarrowWide
          size={16}
          className={cn(
            !isSorting && 'opacity-0 peer-hover:opacity-100 transition-opacity',
          )}
        />
      );
    case 'desc':
      return (
        <LucideArrowUpWideNarrow
          size={16}
          className={cn(
            !isSorting && 'opacity-0 peer-hover:opacity-100 transition-opacity',
          )}
        />
      );
    case 'none':
    default:
      return (
        <ArrowUpDown
          size={16}
          className={cn(
            'opacity-0 peer-hover:opacity-100 transition-opacity translate-x-0',
          )}
        />
      );
  }
};

const TableHeadWrapper = ({
  children,
  alignment,
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
        <div className={cn('text-nowrap peer', cellAlignment({ alignment }))}>
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
  sortAccessor,
  ...props
}: Props) => {
  const {
    onSort,
    sortingEnabled,
    sortAccessor: currentSortAccessor,
  } = useSortingContext();
  const isSorting = currentSortAccessor === sortAccessor;

  return (
    <CnTableHead
      {...props}
      // Disable wrapping text in table head cells.
      // Add alignment props received from ihv/react-hook-table.
      className={cn(
        'text-nowrap h-min p-2',
        cellAlignment({ alignment }),
        className,
      )}
    >
      {sortingEnabled && !!sortAccessor ? (
        <TableHeadWrapper
          onClick={() => onSort(sortAccessor)}
          isSorting={isSorting}
          alignment={alignment}
        >
          {children}
        </TableHeadWrapper>
      ) : (
        children
      )}
    </CnTableHead>
  );
};
