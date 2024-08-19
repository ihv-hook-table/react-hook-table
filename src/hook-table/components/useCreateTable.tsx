import { useMemo } from 'react';
import { TableProps, TableRowType } from '../types';
import { getChildrenProps } from '../utils/getChildrenProps';
import { Table } from './Table/Table';
import { Header } from './Header/Header';
import { Body } from './Body/Body';
import { Footer } from './Footer/Footer';

export const useCreateTable = <T extends TableRowType = TableRowType>() => {
  const HookTable = useMemo(
    () =>
      ({ children, data, isLoading, ...rest }: TableProps<T>) => {
        const columns = getChildrenProps(children);

        return (
          <Table {...rest}>
            <Header columns={columns} />
            <Body columns={columns} data={data} isLoading={isLoading} />
            <Footer columns={columns} data={data} isLoading={isLoading} />
          </Table>
        );
      },
    [],
  );

  return { Table: HookTable };
};
