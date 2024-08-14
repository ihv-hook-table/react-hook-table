import { ReactNode } from "react";

// Utility types

export type TableRowType = Record<PropertyKey, unknown>;

export type TableChildren<T extends TableRowType = TableRowType> =
  | ReactNode
  | ((rowData: T) => ReactNode);

export type AlignmentType = "left" | "center" | "right";

// Table component prop types

type FooterProps = {
  alignment?: AlignmentType;
  colSpan?: number;
  value?: unknown;
  fn?: "sum" | "average";
};

export type ColumnProps<T extends TableRowType = TableRowType> = {
  accessor?: keyof T;
  footer?: FooterProps;
  label?: string;
  toolbar?: boolean;
  keyPrefix?: string;
  alignment?: AlignmentType;
  children?: TableChildren<T>;
};

export type TableProps<T extends TableRowType = TableRowType> = {
  children: TableChildren<T>;
  data?: T[];
  isLoading?: boolean;
  hideHeader?: boolean;
};
