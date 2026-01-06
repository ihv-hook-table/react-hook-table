import { createContext, use, useMemo } from 'react';
import { TableRecord } from '../../types';
import { PaginationContext } from '../pagination-context/pagination-context';
import { useSortingContext } from '../sort-context/sort-context';
import { getSortedData } from '../../utils';

type TableDataContextType<T extends TableRecord = TableRecord> = {
  data?: T[];
};

const createTableDataContext = <T extends TableRecord = TableRecord>() =>
  createContext<TableDataContextType<T>>({
    data: [],
  });

export const DataContext = createTableDataContext();

export const useTableData = () => {
  const { state } = use(PaginationContext) || {};
  const { data } = use(DataContext) || {};

  const { sortDirection, sortAccessor } = useSortingContext();

  const sorted = useMemo(
    () =>
      sortDirection === 'none'
        ? [...(data || [])]
        : getSortedData(sortDirection, sortAccessor, [...(data || [])]),
    [data, sortAccessor, sortDirection],
  );

  if (state?.paginate && state.pageSize && !state.isServersidePagination) {
    const start = (state.pageNumber - 1) * state.pageSize;
    return sorted?.slice(start, start + state.pageSize);
  }

  return sorted;
};
