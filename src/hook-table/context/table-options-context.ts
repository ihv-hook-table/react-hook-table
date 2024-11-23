import {
  ComponentType,
  createContext,
  HTMLAttributes,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';
import {
  ColumnAlignmentProps,
  ExpanderProps,
  FormatOptions,
  NoResultsProps,
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
    Expander?: ComponentType<ExpanderProps>;
    /**
     * @param Table - Html table element.
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
    TableRow?: ComponentType<HTMLAttributes<HTMLTableRowElement>>;
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
      TdHTMLAttributes<HTMLTableCellElement> & ColumnAlignmentProps
    >;
    /**
     * @param TableFooter - Html tfoot element.
     * @returns
     */
    TableFooter?: ComponentType<HTMLAttributes<HTMLTableSectionElement>>;
    /**
     * @param Value - Component that renders the cell value.
     * @returns
     */
    Value?: ComponentType<{
      isSecondaryValue?: boolean;
      value: ReactNode;
    }>;
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
  };
};

const createTableOptionsContext = <F extends FormatOptions = FormatOptions>() =>
  createContext<TableOptionsContextType<F> | undefined>(undefined);

export const TableOptionsContext = createTableOptionsContext();
