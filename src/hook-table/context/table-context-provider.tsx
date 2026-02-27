import { ReactNode, useMemo } from 'react';
import { FormatOptions, TableRecord } from '../types';
import {
  TableOptionsContext,
  TableOptionsContextType,
} from './options-context/options-context';
import { getChildrenProps } from '../utils';
import { ColumnContext } from './column-context/column-context';
import { LoadingContext } from './loading-context/loading-context';
import {
  PaginationContextProvider,
  PaginationState,
} from './pagination-context/pagination-provider';
import { SortingContextProvider } from './sort-context/sort-provider';
import { DataContext } from './data-context/data-context';
import { SelectContextProvider } from './select-context/select-provider';

type Props<
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
> = {
  children: ReactNode;
  columns?: ReactNode;
  globalOptions?: TableOptionsContextType<F>;
  isLoading?: boolean;
  paginate?: PaginationState | boolean;
  data?: T[];
  sortingEnabled?: boolean;
};

const getPaginationProps = (paginate?: PaginationState | boolean) => {
  const isPaginationEnabled = paginate === true || typeof paginate === 'object';
  const isServersidePagination =
    typeof paginate === 'object' && !!paginate.onPaginate;

  const paginationProps = typeof paginate === 'boolean' ? {} : paginate;

  return {
    isPaginationEnabled,
    isServersidePagination,
    ...paginationProps,
  };
};

export const TableContextProvider = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>({
  children,
  globalOptions,
  columns,
  data,
  paginate = false,
  isLoading = false,
  sortingEnabled = false,
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
        <LoadingContext value={{ isLoading }}>
          <PaginationContextProvider
            initialState={{
              numberOfRecords: data?.length,
              ...getPaginationProps(paginate),
            }}
          >
            <SortingContextProvider initialState={{ sortingEnabled }}>
              <SelectContextProvider>
                <DataContext value={{ data }}>{children}</DataContext>
              </SelectContextProvider>
            </SortingContextProvider>
          </PaginationContextProvider>
        </LoadingContext>
      </ColumnContext>
    </TableOptionsContext>
  );
};
