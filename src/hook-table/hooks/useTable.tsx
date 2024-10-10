import { FormatOptions, TableRecord } from '../types';
import { useCreateColumn } from './useCreateColumn';
import { useCreateTable } from './useCreateTable';
import { TableFormatContextType } from '../context/context';

export const useTable = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>(
  formatProps?: TableFormatContextType<F>,
) => {
  const { Table } = useCreateTable<T, TableFormatContextType<F>>(formatProps);
  const { Column } = useCreateColumn<T, F>();

  return {
    Column,
    Table,
  };
};
