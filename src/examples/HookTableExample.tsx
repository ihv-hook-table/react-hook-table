import { Confirm } from '@/components/ui/confirm';
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
    <div className="rounded-md border">
      <Table
        data={mockData}
        isLoading={false}
        caption={{
          value: 'Example table rendering with chadcn/ui table elements',
          alignment: 'top-left',
        }}
      >
        <Column
          expandable
          defaultExpanded={({ id }) => ['Row 2', 'Row 4'].includes(id)}
          colWidth={1}
        >
          {({ additionalData }) => <Subtable data={additionalData} />}
        </Column>
        <Column accessor="id" />
        <Column accessor="date" format="dateTime" />
        <Column accessor="item" />
        <Column accessor="qty" alignment="center" />
        <Column
          accessor="price"
          format="money"
          alignment="right"
          footer={{ value: 'Total:', colSpan: 6 }}
          colWidth={10}
        />
        <Column
          header="Row total"
          alignment="right"
          colWidth={10}
          footer={{
            value: formatMoney({ amount: 123456.56, currency: 'EUR' }),
          }}
        >
          {({ qty, price }) =>
            formatMoney({
              amount: qty * price.amount,
              currency: price.currency,
            })
          }
        </Column>
        <Column expandable="delete" colWidth={1} footer="&nbsp;">
          {({ id }, { closeSubrow }) => (
            <Confirm id={id} onClose={closeSubrow} />
          )}
        </Column>
      </Table>
    </div>
  );
};
