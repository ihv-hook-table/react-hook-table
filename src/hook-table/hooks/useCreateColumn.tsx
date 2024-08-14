import { useMemo } from "react";
import { ColumnProps, TableRowType } from "../types";
import { Column } from "../components";

export const useCreateColumn = <T extends TableRowType = TableRowType>() => {
  const HookColumn = useMemo(
    () => (props: ColumnProps<T>) => <Column {...props} />,
    []
  );

  return { Column: HookColumn };
};
