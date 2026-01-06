import { useCreateColumn } from './use-create-column';
import { useCreateTable } from './use-create-table';
import type { FormatOptions, TableRecord } from '../types';
import { TableOptionsContextType } from '../context/options-context/options-context';

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
