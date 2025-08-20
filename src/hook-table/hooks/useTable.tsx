import { useCreateColumn } from './useCreateColumn';
import { useCreateTable } from './useCreateTable';
import type { TableOptionsContextType } from '../context/table-options-context';
import type { FormatOptions, TableRecord } from '../types';

export const useTable = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>(
  tableOptions?: TableOptionsContextType<F>,
) => {
  const { Table } = useCreateTable<T, F>(tableOptions);
  const { Column } = useCreateColumn<T, F>();

  return {
    Column,
    Table,
  };
};
