import { useTable } from '../hook-table';

type TableData = {
  id: string;
  date?: string;
  item: string;
  price: {
    amount?: number;
    currency?: string;
  };
  qty: number;
};

const data: TableData[] = [
  {
    id: 'Row 1',
    date: '01.01.2024',
    item: 'Apple',
    qty: 1,
    price: { amount: getRandomPrice(), currency: 'EUR' },
  },
  {
    id: 'Row 2',
    date: '01.01.2024',
    item: 'Banana',
    qty: 2,
    price: { amount: getRandomPrice(), currency: 'EUR' },
  },
  {
    id: 'Row 3',
    date: '01.01.2024',
    item: 'Orange',
    qty: 3,
    price: { amount: getRandomPrice(), currency: 'EUR' },
  },
  {
    id: 'Row 4',
    date: '01.01.2024',
    item: 'Potato',
    qty: 4,
    price: { amount: getRandomPrice(), currency: 'EUR' },
  },
  {
    id: 'Row 5',
    date: '01.01.2024',
    item: 'Tomato',
    qty: 5,
    price: { amount: getRandomPrice(), currency: 'EUR' },
  },
];

function getRandomPrice() {
  return parseFloat((Math.random() * (10 - 1) + 1).toFixed(2));
}

export const HookTableExample = () => {
  const { Column, Table } = useTable<TableData>();

  return (
    <Table data={data} isLoading={false}>
      <Column
        accessor={['id', 'date']}
        label={['ID', 'Date']}
        footer={{ value: 'Total', colSpan: 3 }}
      />
      <Column accessor="date" label="Date" />
      <Column accessor="item" label="Item" />
      <Column accessor="qty" label="Qty" footer={{ fn: 'sum' }} />
      <Column accessor="price" label="Price" alignment="right" format="money" />
    </Table>
  );
};
