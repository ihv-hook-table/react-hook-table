import { ReactNode, useMemo } from 'react';
import { FormatOptions, TableRecord } from '../types';
import { getChildrenProps, log } from '../utils';
import { TableFormatContext } from '../context/context';
import { Body, ColGroup, Footer, Header, Table } from '../components';

type TableProps<T extends TableRecord = TableRecord> = {
  children: ReactNode;
  data?: T[];
  isLoading?: boolean;
  hideHeader?: boolean;
};

export const useCreateTable = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>(
  formatOptions?: F,
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
        // const columns = getOrderedColumns(childrenProps);

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
