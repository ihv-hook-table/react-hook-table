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
import { TableDataContext } from '../context/data-context/data-context';
import { PaginationContextProvider } from '../context/pagination-context/pagination-provider';
import { type TableOptionsContextType } from '../context/options-context/options-context';
import { CaptionProps, FormatOptions, TableRecord } from '../types';
import { SortingContextProvider } from '../context/sort-context/sort-provider';
import { TableContextProvider } from '../context/table-context-provider';

type TableProps<T extends TableRecord = TableRecord> = {
  caption?: CaptionProps;
  data?: T[];
  hideHeader?: boolean;
  isLastPage?: boolean;
  /**
   * @param isLoading - Handle initial loading state of the table. If manual pagination is enabled, futher loading state is handled internally.
   */
  isLoading?: boolean;
  onPaginate?: (pageNumber: number, pageSize: number) => Promise<void>;
  pageNumber?: number;
  pageSize?: number;
  paginate?: boolean;
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
        isLastPage,
        isLoading = false,
        paginate = false,
        pageSize,
        pageNumber,
        sortingEnabled = false,
        onPaginate,
        ...rest
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
          >
            <PaginationContextProvider
              initialState={{
                isLastPage,
                numberOfRecords: data?.length,
                onPaginate,
                pageNumber,
                pageSize,
                paginate,
                isLoading,
              }}
            >
              <SortingContextProvider initialState={{ sortingEnabled }}>
                <TableDataContext value={{ data }}>
                  <Toolbar element="TopToolbar" />
                  <Table {...rest}>
                    <TableCaption {...caption} />
                    <ColGroup />
                    {!hideHeader && <Header />}
                    <Body />
                    <Footer isLoading={false} />
                  </Table>
                  <Toolbar element="BottomToolbar" />
                </TableDataContext>
              </SortingContextProvider>
            </PaginationContextProvider>
          </TableContextProvider>
        );
      },
    [globalOptions],
  );

  return { Table: HookTable };
};
