import React, { ReactNode } from 'react';

/**
 * Utility types
 */
export type TableRowType = Record<PropertyKey, unknown>;

export type ColumnChildren<T extends TableRowType = TableRowType> =
  | ReactNode
  | ((rowData: T) => ReactNode);

export type AlignmentType = 'left' | 'center' | 'right';

/**
 * Table component prop types
 */
type FooterProps = {
  alignment?: AlignmentType;
  colSpan?: number;
  value?: unknown;
  fn?: 'sum' | 'average';
};

type AccessorPropsWithoutId<T extends TableRowType = TableRowType> = {
  accessor: keyof T | (keyof T)[];
  children?: ReactNode;
  id?: never;
};

type AccessorPropsWithId<T extends TableRowType = TableRowType> = {
  accessor?: never;
  children: (rowData: T) => ReactNode;
  id: string;
};

export type ColumnProps<T extends TableRowType = TableRowType> = {
  footer?: string | FooterProps;
  label: string | string[];
  toolbar?: boolean;
  keyPrefix?: string;
  alignment?: AlignmentType;
} & (AccessorPropsWithoutId<T> | AccessorPropsWithId<T>);

export type TableProps<T extends TableRowType = TableRowType> = {
  children: ReactNode;
  data?: T[];
  isLoading?: boolean;
  hideHeader?: boolean;
};
