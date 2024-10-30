# Hook Table for React

The project was initiated with the goal of developing a straightforward and easy-to-use type-safe table component. Although there are more feature-rich alternatives available, the emphasis here is on simplicity for projects where complex data tables are unnecessary. Initially, it was meant for personal use, but at some point, I thought, why not share it with others? Maybe someone will find it useful as well.

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
// import css to test with default styles
import '@ihv/react-hook-table/dist/style.css';
```

3. Example data:

```js
const data = [
  {
    name: 'John Doe',
    birthday: '1990-01-01T00:00:00.000Z'
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
  birthday: string;
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
  date: (date: string) => string;
  money: (money: MoneyType) => string;
};

// Format functions can be passed into useTableHook to format table values

const { Table, Column } = useTable<DataType, FormatProps>({
  date: (date) => formatDate(date)
  money: (money) => formatMoney(money)
  translate: (string) => translateFunction(string)
});

<Table data={data}>
  <Column accessor=['name', 'birthday'] />
  <Column accessor="age" header="Age" />
  <Column accessor="city" header="City" alignment="right" />
  <Column accessor="salary" header="Salary" format="money" />
  <Column>
    Hello world
  </Column>
  <Column>
    {(row) => ...do somthing custom with row data}
  </Column>
  <Column expander>
    {({ additionalData }) => <Subtable data={additionalData} />}
  </Column>
</Table>

```

## Column props

- `accessor: (string | string[])` This is the only required prop if Column children are not used. If the header is not defined, the accessor is also used as the header value. If a translate function is passed to the useTable hook, accessor values can also be used as translation keys. If an array of accessors is used, the column will display two or more values.

- `header: (string | string[])` Overrides the accessor as the header. If an array of keys is used, two or more headers will be shown. If a translation function is passed to the useTable hook, the values will be used as translation keys.

- `format: (keyof FormatProps)` Format can be used to format values (e.g., dates, objects). Available values are those defined in FormatProps.

- `alignment: (left | center | right)` Column alignment.

- `colWidth: (number)` Specifies the width of the column as a percentage.
- `expander: (boolean)` !!! WIP - Renders a column with a button to expand a subrow with additional content. (!!! Feature is still in development; use at your own risk. The goal is to allow multiple expanders to show different content. Currently, it works with only one expander column).

- `footer: string | FooterProps` !!! WIP - Can be used to render the table footer. (!!! Feature is still in development; use at your own risk).
