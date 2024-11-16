import { ReactNode } from 'react';

/**
 * Utility types
 */

export type ColumnAlignment = 'left' | 'center' | 'right';
export type TableRecord = Record<PropertyKey, unknown>;
export type FormatOptions = Record<string, (value: never) => ReactNode>;

type ColumnChildren<T extends TableRecord = TableRecord> =
  | ReactNode
  | ((rowData: T) => ReactNode);

type NestedKeyOf<T, K = keyof T> = K extends keyof T & (string | number)
  ? `${K}` | (T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : never)
  : never;

export type ValueFormatKey<F extends FormatOptions = FormatOptions> =
  | keyof F
  | undefined;

export type CaptionProps = {
  value?: ReactNode;
};

/**
 * Column props
 */

type FooterProps = {
  alignment?: ColumnAlignment;
  colSpan?: number;
  value?: unknown;
};

type ColumnPropsWithAccessor<
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
> = {
  /**
   * @param {NestedKeyOf<T> | NestedKeyOf<T>[]} accessor - key path to the value in the data.
   */
  accessor: NestedKeyOf<T> | NestedKeyOf<T>[];
  children?: never;
  /**
   * @param {ValueFormatKey<F> | ValueFormatKey<F>[]} format - The optional format function to apply to the value. If multiple array accessors are provided, the format should be ana array of format function keys.
   */
  format?: ValueFormatKey<F> | ValueFormatKey<F>[];
};

type ColumnPropsWithChildren<T extends TableRecord = TableRecord> = {
  accessor?: never;
  /**
   * @param {ColumnChildren<T>} children - The column children to render. If a function is provided, it will be called with the row data. Can be used for custom rendering.
   */
  children: ColumnChildren<T>;
  format?: never;
};

export type ColumnProps<
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
> = {
  /**
   * @param {ColumnAlignment} alignment - The horizontal alignment of the column.
   */
  alignment?: ColumnAlignment;
  /**
   * @param {number} colWidth - The width of the column in percentage. If not provided, width will be auto.
   */
  colWidth?: number;
  /**
   * @param {ReactNode | FooterProps<T>} footer - The column footer value or props.
   */
  footer?: string | number | FooterProps;
  /**
   * @param {string | string[]} header - The header label(s) of the column. If an array is provided, the header will have multiple labels. First is primary, the rest are secondary.
   */
  header?: string | string[];
  /**
   * @param {boolean} toolbar - Whether the column is a toolbar column. Not implemented yet
   */
  toolbar?: boolean;
  /**
   * @param {boolean} expandable - Whether the column is expandable. Not implemented yet
   */
  expandable?: boolean;
  /**
   * @param {boolean} defaultExpanded - Whether the column is default expanded. Not implemented yet
   */
  defaultExpanded?: boolean | ((rowData: T) => boolean);
} & (ColumnPropsWithAccessor<T, F> | ColumnPropsWithChildren<T>);

export type ExpanderProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export type NoResultsProps = {
  isLoading: boolean;
  columnCount: number;
};
