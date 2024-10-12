import { useTable } from '../hook-table';
import { mockData, MoneyType, TableData } from './mock-data';
import { formatMoney } from './value-format/format-money';
import {
  formatDateFromISOString,
  formatDateTimeFromISOString,
} from './value-format/format-date';

import '../hook-table/hvms-table.css';

type FormatProps = {
  money: (money: MoneyType) => string;
  date: (date: string) => string;
  dateTime: (dateTime: string) => string;
};

export const HookTableExample = () => {
  const { Column, Table } = useTable<TableData, FormatProps>({
    money: formatMoney,
    date: formatDateFromISOString,
    dateTime: formatDateTimeFromISOString,
  });

  // TODO: display header without header prop (use translated accessor) - not sure if this is a good idea
  // TODO: multiple footer rows

  return (
    <Table data={mockData} isLoading={false}>
      <Column
        accessor={['id', 'date']}
        colWidth={10}
        header="#"
        format={[undefined, 'date']}
        footer={{ value: 'Total', colSpan: 4 }}
      />
      <Column accessor="date" header="Date" format="dateTime" colWidth={20} />
      <Column accessor="item" header="Item" />
      <Column accessor="qty" header="Qty" alignment="center" />
      <Column
        accessor="price"
        header="Price"
        alignment="right"
        format="money"
        colWidth={10}
      />
    </Table>
  );
};
