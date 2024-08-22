import { ReactNode } from 'react';

/**
 * Utility types
 */

export type AlignmentType = 'left' | 'center' | 'right';

export type ColumnChildren<T extends TableRowType = TableRowType> =
  | ReactNode
  | ((rowData: T) => ReactNode);

export type NestedKeyOf<T, K = keyof T> = K extends keyof T & (string | number)
  ? `${K}` | (T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : never)
  : never;

export type TableRowType = Record<PropertyKey, unknown>;

/**
 * Table component prop types
 */
type FooterProps<T extends TableRowType = TableRowType> = {
  alignment?: AlignmentType;
  colSpan?: number;
  sumCurrency?: string;
  value?: unknown;
  fn?: 'average' | 'sum' | 'sumMoney';
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
  alignment?: AlignmentType;
  footer?: string | FooterProps<T>;
  label: string | string[];
  toolbar?: boolean;
} & (AccessorPropsWithoutId<T> | AccessorPropsWithId<T>);

export type TableProps<T extends TableRowType = TableRowType> = {
  children: ReactNode;
  data?: T[];
  isLoading?: boolean;
  hideHeader?: boolean;
};
