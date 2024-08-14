import { isValidElement, ReactNode } from "react";
import { TableRowType } from "../types";

export const getPropsFromChildren = <T extends TableRowType = TableRowType>(
  columns: ReactNode | ReactNode[] | ((rowData: T) => ReactNode)
) => {
  const mappedValues = (values: ReactNode[]) =>
    values?.map((child) => {
      if (isValidElement(child)) {
        return child.props;
      }
      return null;
    });

  // If multiple columns are passed as children
  if (Array.isArray(columns)) {
    return mappedValues(columns);
  }

  //If a single column is passed as children
  if (typeof columns === "object") {
    return mappedValues([columns]);
  }

  // Is this needed - TODO: Check
  // if (columns && isValidElement(columns) && !!columns.props.children) {
  //   return mappedValues(columns.props.children);
  // }

  return [];
};
