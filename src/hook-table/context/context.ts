import { createContext } from 'react';
import { FormatOptions } from '../types';

export type TableFormatContextType<F extends FormatOptions = FormatOptions> = {
  /**
   *
   * @param translate - The translation function translate header labels.
   * @returns
   */
  translate?: (key: string) => string | undefined;
} & F;

const createTableContext = <F extends FormatOptions = FormatOptions>() =>
  createContext<TableFormatContextType<F> | undefined>(undefined);

export const TableFormatContext = createTableContext();
