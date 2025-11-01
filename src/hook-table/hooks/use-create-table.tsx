import { ComponentProps, useMemo } from 'react';
import { getChildrenProps } from '../utils';
import {
  Body,
  ColGroup,
  Footer,
  Header,
  Toolbar,
  Table,
  TableCaption,
} from '../components';
import { type TableOptionsContextType } from '../context/options-context/options-context';
import { CaptionProps, FormatOptions, TableRecord } from '../types';
import { TableContextProvider } from '../context/table-context-provider';

type TableProps<T extends TableRecord = TableRecord> = {
  caption?: CaptionProps;
  data?: T[];
  hideHeader?: boolean;
  /**
   * @param isLoading - Handle initial loading state of the table. If manual pagination is enabled, futher loading state is handled internally.
   */
  isLoading?: boolean;
  paginate?: {
    isLastPage?: boolean;
    onPaginate?: (pageNumber: number, pageSize: number) => Promise<void>;
    pageNumber?: number;
    pageSize?: number;
  };
  sortingEnabled?: boolean;
} & ComponentProps<'table'>;

export const useCreateTable = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>(
  globalOptions?: TableOptionsContextType<F>,
) => {
  const HookTable = useMemo(
    () =>
      ({
        children,
        data,
        caption,
        hideHeader = false,
        isLoading,
        paginate,
        sortingEnabled,
        ...htmlProps
      }: TableProps<T>) => {
        const columns = getChildrenProps<T>(children) || {};

        if (!columns || columns.length === 0) {
          console.warn('Please add at least one column to Table');
          return null;
        }

        return (
          <TableContextProvider
            globalOptions={globalOptions}
            columns={children}
            isLoading={isLoading}
            data={data}
            paginate={paginate}
            sortingEnabled={sortingEnabled}
          >
            <Toolbar element="TopToolbar" />
            <Table {...htmlProps}>
              <TableCaption {...caption} />
              <ColGroup />
              {!hideHeader && <Header />}
              <Body />
              <Footer />
            </Table>
            <Toolbar element="BottomToolbar" />
          </TableContextProvider>
        );
      },
    [globalOptions],
  );

  return { Table: HookTable };
};
