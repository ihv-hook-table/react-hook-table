import { TableRowType } from './types';
import { useCreateColumn, useCreateTable } from './components';

import './hvms-table.css';

export const useTable = <
  T extends TableRowType = TableRowType,
  F extends TableRowType = TableRowType,
>(
  formatProps?: F,
) => {
  const { Table } = useCreateTable<T, F>(formatProps);
  const { Column } = useCreateColumn<T, F>();

  return {
    Column,
    Table,
  };
};
