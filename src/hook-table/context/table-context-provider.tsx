import { ReactNode } from 'react';
import { FormatOptions } from '../types';
import {
  TableOptionsContext,
  TableOptionsContextType,
} from './options-context/options-context';

type Props<F extends FormatOptions = FormatOptions> = {
  children: ReactNode;
  globalOptions?: TableOptionsContextType<F>;
};

export const TableContextProvider = ({ children, globalOptions }: Props) => (
  <TableOptionsContext value={globalOptions}>{children}</TableOptionsContext>
);
