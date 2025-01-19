import { Confirm } from '@/examples/table-elements/confirm';
import { AdditionalData, mockData, TableData } from './mock-data';
import { useTable } from './use-table';
import { formatMoney } from './value-format/format-money';
import { useMockData } from './use-mock-data';

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
  // For manual pagination testing
  const { search, data } = useMockData(5);

  return (
    <Table
      data={data?.values}
      // data={mockData}
      // paginate
      // isLoading={isLoading}
      caption={{
        value: 'Example table rendering with chadcn/ui table elements',
        alignment: 'top-left',
      }}
      pageSize={data?.pageSize}
      pageNumber={data?.pageNumber}
      isLastPage={data?.isLastPage}
      onPaginate={(pageNumber, pageSize) => search(pageNumber, pageSize)}
    >
      <Column
        expandable
        // defaultExpanded={({ id }) => ['Row 2', 'Row 8'].includes(id)}
        colWidth={1}
      >
        {({ additionalData }) => <Subtable data={additionalData} />}
      </Column>
      <Column accessor="id" colWidth={10} />
      <Column accessor="date" format="dateTime" colWidth={10} />
      <Column accessor="item" />
      <Column accessor="qty" alignment="center" colWidth={10} />
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
        footer={formatMoney({ amount: 123456.56, currency: 'EUR' })}
      >
        {({ qty, price }) =>
          formatMoney({
            amount: qty * price.amount,
            currency: price.currency,
          })
        }
      </Column>
      <Column expandable="delete" colWidth={1} footer="&nbsp;">
        {({ id }, { closeSubrow }) => <Confirm id={id} onClose={closeSubrow} />}
      </Column>
    </Table>
  );
};
