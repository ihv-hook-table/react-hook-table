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
import { TableDataContext } from '../context/table-data-context';
import { PaginationContextProvider } from '../context/pagination-context/pagination-provider';
import {
  TableOptionsContext,
  type TableOptionsContextType,
} from '../context/table-options-context';
import { CaptionProps, FormatOptions, TableRecord } from '../types';
import { SortingContextProvider } from '../context/sort-context/sort-provider';

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
        onPaginate,
        ...rest
      }: TableProps<T>) => {
        const columns = getChildrenProps<T>(children) || {};

        if (!columns || columns.length === 0) {
          return null;
        }

        return (
          <TableOptionsContext value={globalOptions}>
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
              <SortingContextProvider>
                <TableDataContext value={{ data }}>
                  <Toolbar element="TopToolbar" />
                  <Table {...rest}>
                    <TableCaption {...caption} />
                    <ColGroup columns={columns} />
                    {!hideHeader && <Header columns={columns} />}
                    <Body columns={columns} />
                    <Footer columns={columns} isLoading={false} />
                  </Table>
                  <Toolbar element="BottomToolbar" />
                </TableDataContext>
              </SortingContextProvider>
            </PaginationContextProvider>
          </TableOptionsContext>
        );
      },
    [globalOptions],
  );

  return { Table: HookTable };
};
