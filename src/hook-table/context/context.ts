import { ComponentProps, ComponentType, createContext, ReactNode } from 'react';
import { ColumnAlignment, ExpanderProps, FormatOptions } from '../types';

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
    Table?: ComponentType<ComponentProps<'table'>>;
    /**
     * @param TableHeader - Html thead element.
     * @returns
     */
    TableHeader?: ComponentType<ComponentProps<'thead'>>;
    TableHead?: ComponentType<
      ComponentProps<'th'> & {
        alignment?: ColumnAlignment;
        isMulti?: boolean;
      }
    >;
    /**
     * @param TableRow - Html tr element.
     * @returns
     */
    TableRow?: ComponentType<ComponentProps<'tr'>>;
    /**
     * @param TableBody - Html tbody element.
     * @returns
     */
    TableBody?: ComponentType<ComponentProps<'tbody'>>;
    /**
     * @param TableData - Html td element.
     * @returns
     */
    TableData?: ComponentType<ComponentProps<'td'>>;
    /**
     * @param Value - Component that renders the cell value.
     * @returns
     */
    Value?: ComponentType<{
      isSecondaryValue?: boolean;
      value: ReactNode;
    }>;
  };
};

const createTableContext = <F extends FormatOptions = FormatOptions>() =>
  createContext<TableOptionsContextType<F> | undefined>(undefined);

export const TableFormatContext = createTableContext();
