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
  data?: T[];
  isLoading?: boolean;
  hideHeader?: boolean;
  caption?: CaptionProps;
  paginate?: boolean;
  pageSize?: number;
  pageNumber?: number;
} & ComponentProps<'table'>;

export const useCreateTable = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>(
  tableOptions?: TableOptionsContextType<F>,
) => {
  const HookTable = useMemo(
    () =>
      ({
        children,
        data,
        caption,
        hideHeader = false,
        paginate = false,
        pageSize,
        pageNumber,
        isLoading,
        ...rest
      }: TableProps<T>) => {
        const columns = getChildrenProps<T>(children) || {};

        if (!columns || columns.length === 0) {
          return null;
        }

        return (
          <TableOptionsContext value={tableOptions}>
            <PaginationContextProvider
              initialState={{
                pageNumber,
                pageSize,
                paginate,
                numberOfRecords: data?.length,
              }}
            >
              <TableDataContext value={{ data }}>
                <Table {...rest}>
                  <TableCaption {...caption} />
                  <ColGroup columns={columns} />
                  {!hideHeader && <Header columns={columns} />}
                  <Body columns={columns} isLoading={isLoading} />
                  <Footer columns={columns} isLoading={isLoading} />
                </Table>
                <Pagination />
              </TableDataContext>
            </PaginationContextProvider>
          </TableOptionsContext>
        );
      },
    [tableOptions],
  );

  return { Table: HookTable };
};
