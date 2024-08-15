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
  isLoading = false,
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

  const isNoResults = !data || !data.length || !columns || isLoading;

  if (isNoResults) {
    return <NoResults isLoading={isLoading} />;
  }

  return (
    <tbody>
      {data.map((rowData, index) => (
        <tr key={index} className={clsx(classes.row)}>
          {columns.map(({ accessor, alignment = "left", children }) => {
            let value: ReactNode;

            const childElements =
              children && typeof children === "function" && children(rowData);

            if (childElements) {
              value = childElements;
            }

            if (!children && !!accessor) {
              value = rowData[accessor] as ReactNode;
            }

            return (
              <td
                key={String(accessor)}
                className={clsx(alignment && classes[`align-${alignment}`])}
              >
                {!!value || value === 0 ? value : "-"}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

const NoResults = ({ isLoading }: { isLoading: boolean }) => (
  <tbody>
    <tr>
      <td colSpan={1} className={classes["align-center"]}>
        {isLoading ? "Loading" : "No results"}
      </td>
    </tr>
  </tbody>
);
