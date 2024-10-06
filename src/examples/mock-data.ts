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

function generateISODate() {
  const now = new Date();
  const pastYear = new Date(now.setFullYear(now.getFullYear() - 1));
  const randomDate = new Date(
    pastYear.getTime() + Math.random() * (Date.now() - pastYear.getTime()),
  );
  return randomDate.toISOString();
}

function getRandomPrice() {
  return parseFloat((Math.random() * (10 - 1) + 1).toFixed(2));
}

export const mockData: TableData[] = [
  {
    id: 'Row 1',
    date: generateISODate(),
    item: 'Apple',
    qty: 1,
    price: { amount: getRandomPrice(), currency: 'EUR' },
  },
  {
    id: 'Row 2',
    date: generateISODate(),
    item: 'Banana',
    qty: 2,
    price: { amount: getRandomPrice(), currency: 'EUR' },
  },
  {
    id: 'Row 3',
    date: generateISODate(),
    item: 'Orange',
    qty: 3,
    price: { amount: getRandomPrice(), currency: 'EUR' },
  },
  {
    id: 'Row 4',
    date: generateISODate(),
    item: 'Potato',
    qty: 4,
    price: { amount: getRandomPrice(), currency: 'EUR' },
  },
  {
    id: 'Row 5',
    date: generateISODate(),
    item: 'Tomato',
    qty: 5,
    price: { amount: getRandomPrice(), currency: 'EUR' },
  },
];
