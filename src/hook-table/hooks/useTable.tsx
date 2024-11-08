import { FormatOptions, TableRecord } from '../types';
import { useCreateColumn } from './useCreateColumn';
import { useCreateTable } from './useCreateTable';
import { TableOptionsContextType } from '../context/context';

export const useTable = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>(
  formatProps?: TableOptionsContextType<F>,
) => {
  const { Table } = useCreateTable<T, F>(formatProps);
  const { Column } = useCreateColumn<T, F>();

  return {
    Column,
    Table,
  };
};
