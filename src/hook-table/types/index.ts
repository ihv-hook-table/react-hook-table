import { ReactNode } from "react";

/**
 * Utility types
 */
export type TableRowType = Record<PropertyKey, unknown>;

export type ColumnChildren<T extends TableRowType = TableRowType> =
  | ReactNode
  | ((rowData: T) => ReactNode);

export type AlignmentType = "left" | "center" | "right";

/**
 * Table component prop types
 */
type FooterProps = {
  alignment?: AlignmentType;
  colSpan?: number;
  value?: unknown;
  fn?: "sum" | "average";
};

export type ColumnProps<T extends TableRowType = TableRowType> = {
  accessor?: keyof T;
  footer?: FooterProps;
  label?: string | string[];
  toolbar?: boolean;
  keyPrefix?: string;
  alignment?: AlignmentType;
  children?: ColumnChildren<T>;
};

export type TableProps<T extends TableRowType = TableRowType> = {
  children: ReactNode;
  data?: T[];
  isLoading?: boolean;
  hideHeader?: boolean;
};
