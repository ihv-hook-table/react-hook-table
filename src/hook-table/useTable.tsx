import { TableRowType } from "./types";
import { useCreateTable } from "./hooks/useCreateTable";
import { useCreateColumn } from "./hooks/useCreateColumn";

export const useTable = <T extends TableRowType = TableRowType>() => {
  const { Table } = useCreateTable<T>();
  const { Column } = useCreateColumn<T>();

  return {
    Column,
    Table,
  };
};
