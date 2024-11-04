import { createContext, ReactNode } from 'react';
import { ExpanderProps, FormatOptions } from '../types';

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
  };
} & F;

const createTableContext = <F extends FormatOptions = FormatOptions>() =>
  createContext<TableFormatContextType<F> | undefined>(undefined);

export const TableFormatContext = createTableContext();
