import { AdditionalData, mockData, TableData } from './mock-data';
import { useTable } from './use-table';
import { formatMoney } from './value-format/format-money';

type SubTableProps = {
  data: AdditionalData;
};

const Subtable = ({ data }: SubTableProps) => {
  const { Table, Column } = useTable<AdditionalData>();

  return (
    <Table data={[data]}>
      <Column accessor="description" />
      <Column accessor="category" />
      <Column accessor="supplier" />
      <Column accessor="inStock" format="boolean" />
      <Column accessor="rating" alignment="right" />
    </Table>
  );
};

export const HookTableExample = () => {
  const { Column, Table } = useTable<TableData>();

  return (
    <Table data={mockData} isLoading={false}>
      <Column
        expandable
        defaultExpanded={({ id }) => ['Row 2', 'Row 4'].includes(id)}
        colWidth={5}
        footer={{ value: 'Total', colSpan: 6 }}
      >
        {({ additionalData }) => <Subtable data={additionalData} />}
      </Column>
      <Column accessor={['id', 'date']} />
      <Column accessor="date" format="dateTime" />
      <Column accessor="item" />
      <Column accessor="qty" alignment="center" />
      <Column accessor="price" format="money" alignment="right" />
      <Column
        header="Row total"
        alignment="right"
        colWidth={10}
        footer="123 456,56 €"
      >
        {({ qty, price }) =>
          formatMoney({
            amount: qty * price.amount,
            currency: price.currency,
          })
        }
      </Column>
    </Table>
  );
};
