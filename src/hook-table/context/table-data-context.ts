import { Context, createContext, use } from 'react';
import { TableRecord } from '../types';
import { PaginationContext } from './pagination-context/pagination-context';

type TableDataContextType<T extends TableRecord = TableRecord> = {
  data?: T[];
};

const createTableDataContext = <T extends TableRecord = TableRecord>() =>
  createContext<TableDataContextType<T>>({
    data: [],
  });

export const TableDataContext = createTableDataContext();

export const useTableData = <T extends TableRecord = TableRecord>() => {
  const { state } = use(PaginationContext) || {};
  const { data } =
    use(TableDataContext as Context<TableDataContextType<T>>) || {};

  if (state?.paginate && state.pageSize && !state.isManualPagination) {
    const start = (state.pageNumber - 1) * state.pageSize;
    return data?.slice(start, start + state.pageSize);
  }

  return data;
};
