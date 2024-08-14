/* eslint-disable no-nested-ternary */
import { ReactNode } from "react";
import clsx from "clsx";
// import ToolsMenu from "../table-tools/table-tools";
import { ColumnProps, TableRowType } from "../../types";

import classes from "./Body.module.css";

type Props<T extends TableRowType = TableRowType> = {
  columns: ColumnProps<T>[];
  data?: T[];
  isLoading?: boolean;
};

export const Body = <T extends TableRowType = TableRowType>({
  columns,
  data,
  isLoading,
}: Props<T>) => {
  if (!data || !columns || isLoading) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns?.length || 1}
            className={classes["align-center"]}
          >
            {isLoading ? "Loading" : "No results"}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((item, index) => (
        <tr key={index} className={clsx(classes.row)}>
          {columns.map(({ accessor, alignment = "left", children }) => {
            let element: ReactNode;

            const childElements =
              children && typeof children === "function" && children(item);

            if (childElements) {
              element = childElements;
            }

            if (!children && !!accessor) {
              element = item[accessor] as ReactNode;
            }

            return (
              <td
                key={String(accessor)}
                className={clsx(alignment && classes[`align-${alignment}`])}
              >
                {!!element || element === 0 ? element : "-"}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};
