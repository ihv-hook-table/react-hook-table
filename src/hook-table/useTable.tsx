import { FormatOptions, TableRecord } from './types';
import { useCreateColumn, useCreateTable } from './components';
import { TableFormatContextType } from './context/context';

import './hvms-table.css';

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
