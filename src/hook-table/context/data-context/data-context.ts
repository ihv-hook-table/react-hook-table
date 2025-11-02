import { createContext, use, useMemo } from 'react';
import {
  ColumnProps,
  ColumnsAccessor,
  FormatOptions,
  TableRecord,
} from '../../types';
import { PaginationContext } from '../pagination-context/pagination-context';
import { useSortingContext } from '../sort-context/sort-context';
import { getSortedData } from '../../utils';
import { ColumnContext } from '../column-context/column-context';
import { TableOptionsContext } from '../options-context/options-context';

type TableDataContextType<T extends TableRecord = TableRecord> = {
  data?: T[];
};

const createTableDataContext = <T extends TableRecord = TableRecord>() =>
  createContext<TableDataContextType<T>>({
    data: [],
  });

export const DataContext = createTableDataContext();

const getColumnFormat = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>(
  columns?: ColumnProps<T>[],
  sortAccessor?: ColumnsAccessor<T>,
  formatFunctions?: F,
) => {
  const formatKey = columns?.find(
    ({ accessor }) => accessor === sortAccessor,
  )?.format;

  if (Array.isArray(formatKey)) {
    return formatKey[0] ? formatFunctions?.[formatKey[0]] : undefined;
  }

  return formatKey ? formatFunctions?.[formatKey] : undefined;
};

export const useTableData = () => {
  const { state } = use(PaginationContext) || {};
  const { data } = use(DataContext) || {};
  const columns = use(ColumnContext) || [];
  const { formatFunctions } = use(TableOptionsContext) || {};

  const { sortDirection, sortAccessor } = useSortingContext();

  const normalizedSortAccessor = Array.isArray(sortAccessor)
    ? sortAccessor[0]
    : sortAccessor;

  const columnFormat = getColumnFormat(
    columns,
    normalizedSortAccessor,
    formatFunctions,
  );

  const sorted = useMemo(
    () =>
      sortDirection === 'none'
        ? [...(data || [])]
        : getSortedData(
            sortDirection,
            normalizedSortAccessor,
            [...(data || [])],
            columnFormat,
          ),
    [data, normalizedSortAccessor, sortDirection, columnFormat],
  );

  if (state?.paginate && state.pageSize && !state.isManualPagination) {
    const start = (state.pageNumber - 1) * state.pageSize;
    return sorted?.slice(start, start + state.pageSize);
  }

  return sorted;
};
