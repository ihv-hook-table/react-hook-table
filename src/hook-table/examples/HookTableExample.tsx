import { useTable } from "../useTable";

type TableDataType = {
  id: string;
  item: string;
  amount: number;
};

const data: TableDataType[] = [
  { id: "Row 1", item: "Apple", amount: 1 },
  { id: "Row 2", item: "Banana", amount: 2 },
  { id: "Row 3", item: "Orange", amount: 3 },
  { id: "Row 4", item: "Potato", amount: 4 },
  { id: "Row 5", item: "Tomato", amount: 5 },
];

export const HookTableExample = () => {
  const { Column, Table } = useTable<TableDataType>();

  return (
    <Table data={data} isLoading={false}>
      <Column
        accessor="id"
        label={["ID", "Test"]}
        footer={{ value: "Total", colSpan: 2 }}
      />
      <Column accessor="item" label="Item" />
      <Column
        accessor="amount"
        label={"Amount"}
        alignment="right"
        footer={{ fn: "sum" }}
      />
    </Table>
  );
};
