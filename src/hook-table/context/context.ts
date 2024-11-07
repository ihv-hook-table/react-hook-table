import { ComponentProps, createContext, ReactNode } from 'react';
import { ColumnAlignment, ExpanderProps, FormatOptions } from '../types';

export type TableFormatContextType<F extends FormatOptions = FormatOptions> = {
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
    Expander?: (props: ExpanderProps) => ReactNode;
    /**
     * @param Table - Html table element.
     * @returns
     */
    Table?: (props: ComponentProps<'table'>) => ReactNode;
    /**
     * @param TableHeader - Html thead element.
     * @returns
     */
    TableHeader?: (props: ComponentProps<'thead'>) => ReactNode;
    TableHead?: (
      props: ComponentProps<'th'> & {
        alignment?: ColumnAlignment;
        isMulti?: boolean;
      },
    ) => ReactNode;
    /**
     * @param TableRow - Html tr element.
     * @returns
     */
    TableRow?: (props: ComponentProps<'tr'>) => ReactNode;
    /**
     * @param TableBody - Html tbody element.
     * @returns
     */
    TableBody?: (props: ComponentProps<'tbody'>) => ReactNode;
    /**
     * @param TableData - Html td element.
     * @returns
     */
    TableData?: (props: ComponentProps<'td'>) => ReactNode;
    /**
     * @param Value - Component that renders the cell value.
     * @returns
     */
    Value?: (props: {
      isSecondaryValue?: boolean;
      value: ReactNode;
    }) => ReactNode;
  };
} & F;

const createTableContext = <F extends FormatOptions = FormatOptions>() =>
  createContext<TableFormatContextType<F> | undefined>(undefined);

export const TableFormatContext = createTableContext();
