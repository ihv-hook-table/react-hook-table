import { ReactNode, useMemo } from 'react';
import { FormatOptions, TableRecord } from '../types';
import {
  TableOptionsContext,
  TableOptionsContextType,
} from './options-context/options-context';
import { getChildrenProps } from '../utils';
import { ColumnContext } from './column-context/column-context';
import { LoadingContextProvider } from './loading-context/loading-provider';
import {
  PaginationContextProvider,
  PaginationState,
} from './pagination-context/pagination-provider';

type Props<
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
> = {
  children: ReactNode;
  columns?: ReactNode;
  globalOptions?: TableOptionsContextType<F>;
  isLoading?: boolean;
  paginate?: PaginationState;
  data?: T[];
};

export const TableContextProvider = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>({
  children,
  globalOptions,
  columns,
  data,
  paginate,
  isLoading = false,
}: Props<T, F>) => {
  const columnsProps = useMemo(
    () => getChildrenProps(columns) || [],
    [columns],
  );

  if (!columnsProps || columnsProps.length === 0) {
    console.warn('Please add at least one column to Table');
    return null;
  }

  return (
    <TableOptionsContext value={globalOptions}>
      <ColumnContext value={columnsProps}>
        <LoadingContextProvider value={isLoading}>
          <PaginationContextProvider
            initialState={{
              numberOfRecords: data?.length,
              ...paginate,
            }}
          >
            {children}
          </PaginationContextProvider>
        </LoadingContextProvider>
      </ColumnContext>
    </TableOptionsContext>
  );
};
