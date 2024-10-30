# Hook Table for React

The project was initiated with the goal of developing a straightforward and easy-to-use typesafe table component. Although there are more feature-rich alternatives available, the emphasis here is on simplicity for projects where complex data tables are unnecessary.

The project is still under development, but most of the basic functionality should remain unchanged.

## How to use

To use the table component in your project, follow these steps:

1. Install the package using your preferred package manager. For example, with npm:

```shell
npm install @ihv/react-hook-table
```

2. Import the hook:

```js
import { useTable } from '@ihv/react-hook-table';
import '@ihv/react-hook-table/dist/style.css'; // to test with default styles
```

3. Example data:

```js
const data = [
  {
    name: 'John Doe',
    age: 25,
    city: 'New York',
    salary: { amount: 1500, currency: 'EUR' },
  },
];
```

4. Render the table component with the data:

```jsx
type DataType = {
  name: string;
  age: number;
  city: string;
  salary: {
    amount: number;
    currency: string;
  }
};

export type MoneyType = {
  amount: number;
  currency: string;
};

type FormatProps = {
  money: (money: MoneyType) => string;
};

// Format functions can be passed into useTableHook to format table values

const { Table, Column } = useTable<DataType, FormatProps>({
  money: (money) => formatMoney(money)
});

<Table data={data}>
  <Column accessor="name" header="Name" />
  <Column accessor="age" header="Age" />
  <Column accessor="city" header="City" alignment="right" />

  * Accessor can point to an object as well, but in this case, a custom format function has to be passed to the hook.

  <Column accessor="salary" header="Salary" format="money" />
</Table>

```
