import { createContext } from 'react';
import { FormatOptions } from '../../types';

export type TableFormatContextType<F extends FormatOptions = FormatOptions> = {
  translate?: (key: string) => string;
} & F;

const createTableContext = <F extends FormatOptions = FormatOptions>() =>
  createContext<TableFormatContextType<F> | undefined>(undefined);

export const TableFormatContext = createTableContext();
