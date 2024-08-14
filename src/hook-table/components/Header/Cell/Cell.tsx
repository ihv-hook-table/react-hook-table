import clsx from "clsx";
import { ColumnProps, TableRowType } from "../../types";
import classes from "./Cell.module.css";

type HeaderCellProps<T extends TableRowType = TableRowType> = {
  column: ColumnProps<T>;
};

export const HeaderCell = <T extends TableRowType = TableRowType>({
  column,
}: HeaderCellProps<T>) => {
  const { alignment = "left", label, accessor } = column || {};

  return (
    <th className={clsx(alignment && classes[`align-${alignment}`])}>
      {label ?? String(accessor)}
    </th>
  );
};
