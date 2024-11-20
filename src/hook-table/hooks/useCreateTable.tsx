import { ComponentProps, useMemo } from 'react';
import { CaptionProps, FormatOptions, TableRecord } from '../types';
import { getChildrenProps, log } from '../utils';
import {
  TableOptionsContext,
  TableOptionsContextType,
} from '../context/table-options-context';
import { Body, ColGroup, Footer, Header } from '../components';
import { Table, TableCaption } from '../components/default-components';

type TableProps<T extends TableRecord = TableRecord> = {
  data?: T[];
  isLoading?: boolean;
  hideHeader?: boolean;
  caption?: CaptionProps;
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
        caption,
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
          <TableOptionsContext.Provider value={formatOptions}>
            <Table {...rest}>
              <TableCaption {...caption} />
              <ColGroup columns={columns} />
              {!hideHeader && <Header columns={columns} />}
              <Body columns={columns} data={data} isLoading={isLoading} />
              <Footer columns={columns} data={data} isLoading={isLoading} />
            </Table>
          </TableOptionsContext.Provider>
        );
      },
    [formatOptions],
  );

  return { Table: HookTable };
};
