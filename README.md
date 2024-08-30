# Hook Table for React

The project was initiated with the goal of developing a straightforward and easy-to-use table component. Although there are more feature-rich alternatives available, the emphasis here is on simplicity for projects where complex data tables are unnecessary.

## How to use

To use the table component in your project, follow these steps:

1. Install the package using your preferred package manager. For example, with npm:

```shell
npm install @hvms/hook-table-react
```

2. Import the hook:

```js
import { useTable } from '@hvms/hook-table-react';
```

3. Example data:

```js
const data = [
  { name: 'John Doe', age: 25, city: 'New York' },
  { name: 'Jane Smith', age: 30, city: 'San Francisco' },
];
```

4. Render the table component with the data:

```jsx
type DataType = {
  name: string;
  age: number;
  city: string;
};

const { Table, Column } = useTable<DataType>();

<Table data={data}>
  <Column accessor="name" label="Name" />
  <Column accessor="age" label="Age" />
  <Column accessor="city" label="City" />
</Table>;
```
