import { ColumnProps, TableRowType } from "../../types";
import { HeaderCell } from "./Cell/Cell";

import classes from "./Header.module.css";

type Props<T extends TableRowType = TableRowType> = {
  columns: ColumnProps<T>[];
};

export const Header = <T extends TableRowType = TableRowType>({
  columns,
}: Props<T>) => (
  <thead>
    <tr className={classes.header}>
      {columns?.map((col, idx) => (
        <HeaderCell key={idx} column={col} />
      ))}
    </tr>
  </thead>
);
