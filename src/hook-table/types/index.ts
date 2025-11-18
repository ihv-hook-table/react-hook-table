import { ReactNode } from 'react';

/**
 * Utility types
 */
export type SortDirection = 'asc' | 'desc' | 'none';
type ColumnAlignment = 'left' | 'center' | 'right';
type CaptionAlignment =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type TableRecord = Record<string | number, unknown>;

type FormatRecord = {
  [K in string]: (value: unknown) => string;
};

type InferFormatValue<T> = T extends (value: infer V) => string ? V : never;

export type FormatOptions<
  F extends FormatRecord = FormatRecord,
  K extends keyof F = keyof F,
> = {
  [P in K]: InferFormatValue<F[P]>;
};

type SubrowActions = {
  closeSubrow?: () => void;
};

type ColumnChildren<T extends TableRecord = TableRecord> =
  | ReactNode
  | ((rowData: T, subrowActions: SubrowActions) => ReactNode);

type NestedKeyOf<T, K = keyof T> = K extends keyof T & (string | number)
  ? `${K}` | (T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : never)
  : never;

export type ValueFormatKey<
  F extends FormatOptions = FormatOptions,
  K extends keyof F = keyof F,
> = K | undefined;

/**
 * Column props
 */

export type ColumnAccessor<T extends TableRecord = TableRecord> =
  NestedKeyOf<T>;

type ColumnPropsWithAccessor<
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
> = {
  accessor: ColumnAccessor<T> | ColumnAccessor<T>[];
  children?: never;
  format?: ValueFormatKey<F> | ValueFormatKey<F>[];
};

type ColumnPropsWithChildren<T extends TableRecord = TableRecord> = {
  accessor?: never;
  children: ColumnChildren<T>;
  format?: never;
};

export type ColumnProps<
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
> = {
  sortAccessor?: ColumnAccessor<T>;
  alignment?: ColumnAlignment;
  colWidth?: number;
  footer?: string | number | boolean | FooterProps;
  header?: string | string[];
  wrap?: boolean;
  expandable?: boolean | string;
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
  isLoading?: boolean;
  columnCount: number;
};

export type TableRowProps = {
  subrow?: boolean;
  isLoading?: boolean;
};

export type CaptionProps = {
  alignment?: CaptionAlignment;
  value?: ReactNode;
};

export type TableCaptionProps = Pick<CaptionProps, 'alignment'>;

export type TableDataProps = ColumnAlignmentProps & {
  expandable?: boolean;
};

/**
 * Pagination types
 */

export type PaginationProps = {
  isLastPage?: boolean;
  isManualPagination?: boolean;
  pageNumber: number;
  pageSize: number;
  pageCount?: number;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (pageSize: number) => void;
  goToPage: (pageNumber: number) => void;
  pageSizeOptions?: number[];
};
