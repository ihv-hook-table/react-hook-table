import { ReactNode } from 'react';

/**
 * Utility types
 */

export type ColumnAlignment = 'left' | 'center' | 'right';

type ColumnChildren<T extends TableRecord = TableRecord> =
  | ReactNode
  | ((rowData: T) => ReactNode);

export type FormatOptions = Record<string, (value: never) => ReactNode>;

type NestedKeyOf<T, K = keyof T> = K extends keyof T & (string | number)
  ? `${K}` | (T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : never)
  : never;

export type TableRecord = Record<PropertyKey, unknown>;

export type ValueFormatKey<F extends FormatOptions = FormatOptions> =
  | keyof F
  | (keyof F | undefined)[]
  | undefined;

/**
 * Column props
 */

type ColumnPropsWithAccessor<T extends TableRecord = TableRecord> = {
  accessor: NestedKeyOf<T> | NestedKeyOf<T>[];
  children?: never;
};

type ColumnPropsWithChildren<T extends TableRecord = TableRecord> = {
  accessor?: never;
  children: ColumnChildren<T>;
};

export type ColumnProps<
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
> = {
  alignment?: ColumnAlignment;
  colWidth?: number;
  footer?: string | FooterProps<T>;
  format?: ValueFormatKey<F>;
  header: string | string[];
  toolbar?: boolean;
} & (ColumnPropsWithAccessor<T> | ColumnPropsWithChildren<T>);

type FooterProps<T extends TableRecord = TableRecord> = {
  accessor?: NestedKeyOf<T>;
  alignment?: ColumnAlignment;
  colSpan?: number;
  value?: unknown;
};
