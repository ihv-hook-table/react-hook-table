import {
  ComponentType,
  createContext,
  HTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';
import {
  ColumnAlignmentProps,
  TableExpanderProps,
  FormatOptions,
  NoResultsProps,
  TableRowProps,
  PaginationProps,
} from '../types';

export type TableOptionsContextType<F extends FormatOptions = FormatOptions> = {
  /**
   * @param format - The format options to format the cell value.
   * @returns
   */
  formatFunctions?: F;
  /**
   * @param translate - The translation function translate header labels.
   * @returns
   */
  translate?: (key: string) => string | undefined;
  /**
   * @param components - The components to override the default components.
   * @returns
   */
  components?: {
    /**
     * @param Expandable - Component that toggles the visibility of the expandable content.
     * @returns
     */
    Expander?: ComponentType<TableExpanderProps>;
    /**
     * @param Pagination - Component that renders the pagination section.
     * @returns
     */
    Table?: ComponentType<HTMLAttributes<HTMLTableElement>>;
    /**
     * @param TableHeader - Html thead element.
     * @returns
     */
    TableHeader?: ComponentType<HTMLAttributes<HTMLTableSectionElement>>;
    TableHead?: ComponentType<
      ThHTMLAttributes<HTMLTableCellElement> & ColumnAlignmentProps
    >;
    /**
     * @param TableRow - Html tr element.
     * @returns
     */
    TableRow?: ComponentType<HTMLAttributes<HTMLTableRowElement>> &
      TableRowProps;
    /**
     * @param TableBody - Html tbody element.
     * @returns
     */
    TableBody?: ComponentType<HTMLAttributes<HTMLTableSectionElement>>;
    /**
     * @param TableData - Html td element.
     * @returns
     */
    TableData?: ComponentType<
      TdHTMLAttributes<HTMLTableCellElement> &
        ColumnAlignmentProps & {
          expandable?: boolean;
          isSubRow?: boolean;
          wrap: boolean;
        }
    >;
    /**
     * @param TableFooter - Html tfoot element.
     * @returns
     */
    TableFooter?: ComponentType<HTMLAttributes<HTMLTableSectionElement>>;
    /**
     * @param Value - Component that renders the cell value. It can be used to format the cell value. Accepts the isSecondaryValue prop, that turns true when the cell has more than one value.
     * @returns
     */
    Value?: ComponentType<
      HTMLAttributes<HTMLDivElement> & { isSecondaryValue?: boolean }
    >;
    /**
     * @param TableCaption - Html caption element.
     * @returns
     */
    TableCaption?: ComponentType<HTMLAttributes<HTMLTableCaptionElement>>;
    /**
     * @param NoResults - Component that renders the no results message.
     * @returns
     */
    NoResults?: ComponentType<NoResultsProps>;
    /**
     * @param TopToolbar - Component for the top toolbar. Receives the pagination props.
     * @returns
     */
    TopToolbar?: ComponentType<PaginationProps>;
    /**
     * @param BottomToolbar - Component for the top toolbar. Receives the pagination props.
     * @returns
     */
    BottomToolbar?: ComponentType<PaginationProps>;
  };
  pagination?: {
    /**
     * @param defaultPageSize - The default page size to paginate the table.
     */
    defaultPageSize?: number;
    /**
     * @param pageSizeOptions - The page size options to paginate the table.
     */
    pageSizeOptions?: number[];
  };
};

const createTableOptionsContext = <F extends FormatOptions = FormatOptions>() =>
  createContext<TableOptionsContextType<F> | undefined>(undefined);

export const TableOptionsContext = createTableOptionsContext();
