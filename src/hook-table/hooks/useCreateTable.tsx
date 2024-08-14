import { useMemo } from "react";
import { TableProps, TableRowType } from "../types";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { Table } from "../components/Table/Table";
import { Body } from "../components/Body/Body";
import { getPropsFromChildren } from "../helpers/table";

export const useCreateTable = <T extends TableRowType = TableRowType>() => {
  const HookTable = useMemo(
    () =>
      ({ children, data, isLoading, ...rest }: TableProps<T>) => {
        const columns = getPropsFromChildren(children);

        return (
          <Table {...rest}>
            <Header columns={columns} />
            <Body columns={columns} data={data} isLoading={isLoading} />
            <Footer columns={columns} data={data} isLoading={isLoading} />
          </Table>
        );
      },
    []
  );

  return { Table: HookTable };
};
