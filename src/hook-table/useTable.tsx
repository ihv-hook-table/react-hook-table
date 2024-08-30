import { TableRowType } from './types';
import { useCreateColumn, useCreateTable } from './components';

import './hvms-table.css';

export const useTable = <T extends TableRowType = TableRowType>() => {
  const { Table } = useCreateTable<T>();
  const { Column } = useCreateColumn<T>();

  return {
    Column,
    Table,
  };
};
