import { FormatOptions, TableRecord } from '../types';
import { useCreateColumn } from './useCreateColumn';
import { useCreateTable } from './useCreateTable';
import { TableFormatContextType } from '../context/context';
import { useCreateExpandable } from './useCreateExpandable';

export const useTable = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>(
  formatProps?: TableFormatContextType<F>,
) => {
  const { Table } = useCreateTable<T, TableFormatContextType<F>>(formatProps);
  const { Column } = useCreateColumn<T, F>();
  const { Expandable } = useCreateExpandable<T>();

  return {
    Column,
    Expandable,
    Table,
  };
};
