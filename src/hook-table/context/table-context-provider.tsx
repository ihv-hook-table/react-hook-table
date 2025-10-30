import { ReactNode, useMemo } from 'react';
import { FormatOptions } from '../types';
import {
  TableOptionsContext,
  TableOptionsContextType,
} from './options-context/options-context';
import { getChildrenProps } from '../utils';
import { ColumnContext } from './column-context/column-context';
import { LoadingContextProvider } from './loading-context/loading-provider';

type Props<F extends FormatOptions = FormatOptions> = {
  children: ReactNode;
  columns?: ReactNode;
  globalOptions?: TableOptionsContextType<F>;
  isLoading?: boolean;
};

export const TableContextProvider = <F extends FormatOptions = FormatOptions>({
  children,
  globalOptions,
  columns,
  isLoading = false,
}: Props<F>) => {
  const columnsProps = useMemo(
    () => getChildrenProps(columns) || [],
    [columns],
  );

  if (!columnsProps || columnsProps.length === 0) {
    console.warn('Please add at least one column to Table');
    return null;
  }

  return (
    <TableOptionsContext value={globalOptions}>
      <ColumnContext value={columnsProps}>
        <LoadingContextProvider value={isLoading}>
          {children}
        </LoadingContextProvider>
      </ColumnContext>
    </TableOptionsContext>
  );
};
