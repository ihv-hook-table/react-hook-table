import { isValidElement, ReactNode } from "react";

export const getChildrenProps = (columns: ReactNode) => {
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

  return [];
};
