import { ReactNode } from 'react';

/**
 * Utility types
 */
export type TableRowType = Record<PropertyKey, unknown>;

export type ColumnChildren<T extends TableRowType = TableRowType> =
  | ReactNode
  | ((rowData: T) => ReactNode);

export type AlignmentType = 'left' | 'center' | 'right';

export type NestedKeyOf<T, K = keyof T> = K extends keyof T & (string | number)
  ? `${K}` | (T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : never)
  : never;

/**
 * Table component prop types
 */
type FooterProps<T extends TableRowType = TableRowType> = {
  alignment?: AlignmentType;
  colSpan?: number;
  value?: unknown;
  fn?: 'sum' | 'average';
  accessor?: NestedKeyOf<T>;
};

type AccessorPropsWithoutId<T extends TableRowType = TableRowType> = {
  accessor: NestedKeyOf<T> | NestedKeyOf<T>[];
  children?: ReactNode;
  id?: never;
};

type AccessorPropsWithId<T extends TableRowType = TableRowType> = {
  accessor?: never;
  children: (rowData: T) => ReactNode;
  id: string;
};

export type ColumnProps<T extends TableRowType = TableRowType> = {
  footer?: string | FooterProps<T>;
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
