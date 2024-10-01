import { useTable } from '../hook-table';
import { mockData, MoneyType, TableData } from './mock-data';

import '../hook-table/hvms-table.css';
import { formatMoney } from './value-format/format-money';

type FormatProps = {
  money: (money: MoneyType) => string | undefined;
};

export const HookTableExample = () => {
  const { Column, Table } = useTable<TableData, FormatProps>({
    money: formatMoney,
  });

  return (
    <Table data={mockData} isLoading={false}>
      <Column accessor={['id', 'date']} header="#" footer="Total" />
      <Column accessor="date" header="Date" />
      <Column accessor="item" header="Item" />
      <Column accessor="qty" header="Qty" alignment="center" />
      <Column
        accessor="price"
        header="Price"
        alignment="right"
        format="money"
        footer={{ fn: 'sumMoney', colSpan: 4 }}
      />
    </Table>
  );
};
