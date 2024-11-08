import { ComponentProps, useMemo } from 'react';
import { FormatOptions, TableRecord } from '../types';
import { getChildrenProps, log } from '../utils';
import {
  TableFormatContext,
  TableOptionsContextType,
} from '../context/context';
import { Body, ColGroup, Footer, Header } from '../components';
import { Table } from '../components/default-components';

type TableProps<T extends TableRecord = TableRecord> = {
  data?: T[];
  isLoading?: boolean;
  hideHeader?: boolean;
} & ComponentProps<'table'>;

export const useCreateTable = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>(
  formatOptions?: TableOptionsContextType<F>,
) => {
  const HookTable = useMemo(
    () =>
      ({
        children,
        data,
        hideHeader = false,
        isLoading,
        ...rest
      }: TableProps<T>) => {
        const columns = getChildrenProps<T>(children) || {};

        if (!columns || columns.length === 0) {
          return null;
        }

        if (import.meta.env.DEV) {
          log('useCreateTable - columns', columns);
        }

        return (
          <TableFormatContext.Provider value={formatOptions}>
            <Table {...rest}>
              <ColGroup columns={columns} />
              {!hideHeader && <Header columns={columns} />}
              <Body columns={columns} data={data} isLoading={isLoading} />
              <Footer columns={columns} data={data} isLoading={isLoading} />
            </Table>
          </TableFormatContext.Provider>
        );
      },
    [formatOptions],
  );

  return { Table: HookTable };
};
