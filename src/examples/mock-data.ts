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

function generateMockData(numRows: number): TableData[] {
  const items = [
    'Apple',
    'Banana',
    'Orange',
    'Potato',
    'Tomato',
    'Grapes',
    'Mango',
  ];

  return Array.from({ length: numRows }, (_, index) => ({
    id: `Row ${index + 1}`,
    date: generateISODate(),
    item: items[Math.floor(Math.random() * items.length)],
    qty: Math.floor(Math.random() * 10) + 1,
    price: { amount: getRandomPrice(), currency: 'EUR' },
  }));
}

export const mockData = generateMockData(10);
