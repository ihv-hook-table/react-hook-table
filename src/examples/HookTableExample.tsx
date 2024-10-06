import { useTable } from '../hook-table';
import { mockData, MoneyType, TableData } from './mock-data';

import '../hook-table/hvms-table.css';
import { formatMoney } from './value-format/format-money';
import {
  formatDateFromISOString,
  formatDateTimeFromISOString,
} from './value-format/format-date';

type FormatProps = {
  money: (money: MoneyType) => string | undefined;
  date: (date: string) => string;
  dateTime: (dateTime: string) => string;
};

export const HookTableExample = () => {
  const { Column, Table } = useTable<TableData, FormatProps>({
    money: formatMoney,
    date: formatDateFromISOString,
    dateTime: formatDateTimeFromISOString,
  });

  return (
    <Table data={mockData} isLoading={false}>
      <Column
        accessor={['id', 'date']}
        header="#"
        format={[undefined, 'dateTime']}
      />
      <Column accessor="date" header="Date" format="dateTime" />
      <Column accessor="item" header="Item" />
      <Column accessor="qty" header="Qty" alignment="center" />
      <Column
        accessor="price"
        header="Price"
        alignment="right"
        format="money"
      />
    </Table>
  );
};
