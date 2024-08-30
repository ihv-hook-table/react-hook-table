import { useTable } from '../hook-table';

// Cstom helper type to override props
// type OverrideProps<T, TOverridden> = Omit<T, keyof TOverridden> & TOverridden;
// usage
// type InputProps = OverrideProps<
//   ComponentProps<'input'>,
//   { onChange: (value: string) => string }
// >;

// type test = [Expect<Equal<typeof data, TableData[] | undefined>>];

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
  {
    id: 'Row 6',
    date: '01.01.2024',
    item: 'Cucumber',
    qty: 6,
    price: { amount: getRandomPrice(), currency: 'EUR' },
  },
  {
    id: 'Row 7',
    date: '01.01.2024',
    item: 'Carrot',
    qty: 7,
    price: { amount: getRandomPrice(), currency: 'EUR' },
  },
  {
    id: 'Row 8',
    date: '01.01.2024',
    item: 'Broccoli',
    qty: 8,
    price: { amount: getRandomPrice(), currency: 'EUR' },
  },
  {
    id: 'Row 9',
    date: '01.01.2024',
    item: 'Lettuce',
    qty: 9,
    price: { amount: getRandomPrice(), currency: 'EUR' },
  },
  {
    id: 'Row 10',
    date: '01.01.2024',
    item: 'Cabbage',
    qty: 10,
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
      <Column
        accessor="price"
        label="Price"
        alignment="right"
        format="money"
        footer={{
          fn: 'sumMoney',
          accessor: 'price.amount',
          sumCurrency: 'EUR',
        }}
      />
    </Table>
  );
};