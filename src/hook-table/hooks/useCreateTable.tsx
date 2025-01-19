import { ComponentProps, useMemo } from 'react';
import { CaptionProps, FormatOptions, TableRecord } from '../types';
import { getChildrenProps } from '../utils';
import {
  TableOptionsContext,
  TableOptionsContextType,
} from '../context/table-options-context';
import { Body, ColGroup, Footer, Header } from '../components';
import { Table, TableCaption } from '../components/default-components';
import { TableDataContext } from '../context/table-data-context';
import { PaginationContextProvider } from '../context/pagination-context/pagination-provider';
import { Pagination } from '../components/default-components/Pagination';

type TableProps<T extends TableRecord = TableRecord> = {
  caption?: CaptionProps;
  data?: T[];
  hideHeader?: boolean;
  isLastPage?: boolean;
  isLoading?: boolean;
  onPaginate?: (pageNumber: number, pageSize: number) => void;
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
        isLoading,
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
              }}
            >
              <TableDataContext value={{ data }}>
                {/* Custom top element with pagination options and functions */}
                <Table {...rest}>
                  <TableCaption {...caption} />
                  <ColGroup columns={columns} />
                  {!hideHeader && <Header columns={columns} />}
                  <Body columns={columns} isLoading={isLoading} />
                  <Footer columns={columns} isLoading={isLoading} />
                </Table>
                {/* Replace Pagination with Custom bottom element with pagination options and functions */}
                <Pagination />
              </TableDataContext>
            </PaginationContextProvider>
          </TableOptionsContext>
        );
      },
    [globalOptions],
  );

  return { Table: HookTable };
};
