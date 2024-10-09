import { TableRecord } from './types';
import { useCreateColumn, useCreateTable } from './components';
import { TableFormatContextType } from './components/context/context';

import './hvms-table.css';

export const useTable = <
  T extends TableRecord = TableRecord,
  F extends TableRecord = TableRecord,
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
