import { Value } from '../components/Value/Value';
import { useTable } from '../useTable';

type TableData = {
  id: string;
  date?: string;
  item: string;
  price: number;
  qty: number;
};

const data: TableData[] = [
  { id: 'Row 1', date: '01.01.2024', item: 'Apple', qty: 1, price: 1 },
  { id: 'Row 2', date: '01.01.2024', item: 'Banana', qty: 2, price: 2 },
  { id: 'Row 3', date: '01.01.2024', item: 'Orange', qty: 3, price: 3 },
  { id: 'Row 4', date: '01.01.2024', item: 'Potato', qty: 4, price: 4 },
  { id: 'Row 5', date: '01.01.2024', item: 'Tomato', qty: 5, price: 5 },
  { id: 'Row 6', date: '01.01.2024', item: 'Cucumber', qty: 6, price: 6 },
  { id: 'Row 7', date: '01.01.2024', item: 'Carrot', qty: 7, price: 7 },
  { id: 'Row 8', date: '01.01.2024', item: 'Broccoli', qty: 8, price: 8 },
  { id: 'Row 9', date: '01.01.2024', item: 'Lettuce', qty: 9, price: 9 },
  { id: 'Row 10', date: '01.01.2024', item: 'Cabbage', qty: 10, price: 10 },
];

export const HookTableExample = () => {
  const { Column, Table } = useTable<TableData>();

  return (
    <Table data={data} isLoading={false}>
      <Column
        accessor="id"
        label="ID"
        footer={{ value: 'Total', colSpan: 3, alignment: 'left' }}
      />
      <Column accessor="item" label="Item" />
      <Column accessor="qty" label="Qty" alignment="center" />
      <Column
        accessor="price"
        label="Price"
        alignment="right"
        footer={{ fn: 'sum' }}
      />
    </Table>
  );
};
