import { ReactNode } from 'react';

/**
 * Utility types
 */

type ColumnAlignment = 'left' | 'center' | 'right';
type CaptionAlignment =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type TableRecord = Record<PropertyKey, unknown>;
export type FormatOptions = Record<string, (value: never) => ReactNode>;

type SubrowActions = {
  closeSubrow: () => void;
};

type ColumnChildren<T extends TableRecord = TableRecord> =
  | ReactNode
  | ((rowData: T, subrowActions: SubrowActions) => ReactNode);

type NestedKeyOf<T, K = keyof T> = K extends keyof T & (string | number)
  ? `${K}` | (T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : never)
  : never;

export type ValueFormatKey<F extends FormatOptions = FormatOptions> =
  | keyof F
  | undefined;

/**
 * Column props
 */

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
   * @param {boolean} wrap - Whether the column should wrap text.
   */
  wrap?: boolean;
  /**
   * @param {boolean | string} expandable - Whether the column is expandable. Boolean can be used if row has single expander. Unique string identifier can be used if row has multiple expanders.
   */
  expandable?: boolean | string;
  /**
   * @param {boolean} defaultExpanded - Whether the column is default expanded. Works only if expandable is defined.
   */
  defaultExpanded?: boolean | ((rowData: T) => boolean);
} & (ColumnPropsWithAccessor<T, F> | ColumnPropsWithChildren<T>);

type FooterProps = {
  alignment?: ColumnAlignment;
  colSpan?: number;
  value?: unknown;
};

export type ColumnAlignmentProps = {
  alignment?: ColumnAlignment;
  isMultiValue?: boolean;
};

export type TableExpanderProps = {
  isOpen: boolean;
  toggle: () => void;
  identifier?: string;
};

export type NoResultsProps = {
  isLoading: boolean;
  columnCount: number;
};

export type TableRowProps = {
  subrow?: boolean;
  expanded?: boolean;
};

export type TableCaptionProps = {
  alignment?: CaptionAlignment;
  value?: ReactNode;
};
