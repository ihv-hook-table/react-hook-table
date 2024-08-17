import { TableRowType } from './types';
import { useCreateColumn, useCreateTable } from './components';

export const useTable = <T extends TableRowType = TableRowType>() => {
  console.log(navigator.language);
  const { Table } = useCreateTable<T>();
  const { Column } = useCreateColumn<T>();

  return {
    Column,
    Table,
  };
};
