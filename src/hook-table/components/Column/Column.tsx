/* eslint-disable @typescript-eslint/no-unused-vars */

import { ColumnProps, TableRowType } from "../../types";

export const Column = <T extends TableRowType = TableRowType>(
  _props: ColumnProps<T>
): JSX.Element => {
  return <></>;
};
