import { ReactNode, useMemo } from 'react';
import { FormatOptions, TableRecord } from '../types';
import { getChildrenProps } from '../utils';
import { Table } from './Table/Table';
import { Header } from './Header/Header';
import { Body } from './Body/Body';
import { Footer } from './Footer/Footer';
import { TableFormatContext } from '../context/context';

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
  FormatOptionss?: F,
) => {
  const HookTable = useMemo(
    () =>
      ({ children, data, isLoading, ...rest }: TableProps<T>) => {
        const columns = getChildrenProps<T>(children);

        return (
          <TableFormatContext.Provider value={FormatOptionss}>
            <Table {...rest}>
              <Header columns={columns} />
              <Body columns={columns} data={data} isLoading={isLoading} />
              <Footer columns={columns} data={data} isLoading={isLoading} />
            </Table>
          </TableFormatContext.Provider>
        );
      },
    [FormatOptionss],
  );

  return { Table: HookTable };
};
