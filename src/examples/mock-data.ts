export type MoneyType = {
  amount?: number;
  currency?: string;
};

export type TableData = {
  id: string;
  date?: string;
  item: string;
  price: MoneyType;
  qty: number;
};

export const mockData: TableData[] = [
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
