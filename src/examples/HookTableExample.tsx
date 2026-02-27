import { Confirm } from '@/examples/table-elements';
import { AdditionalData, TableData } from './mock-data';
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
  const { search, data, isLoading } = useMockData(5);

  return (
    <div className="p-8">
      <Table
        data={data?.values}
        // data={mockData}
        isLoading={isLoading}
        caption={{
          value: 'Example table rendering with chadcn/ui table elements',
          alignment: 'top-left',
        }}
        paginate={{
          onPaginate: ({ pageNumber, pageSize }) =>
            search(pageNumber, pageSize),
          pageNumber: data?.pageNumber,
          pageSize: data?.pageSize,
          isLastPage: data?.isLastPage,
        }}
        sortingEnabled
      >
        <Column select accessor="id" colWidth={2.1} alignment="center" />
        <Column
          action
          // defaultExpanded={({ id }) => ['Row 2', 'Row 8'].includes(id)}
          colWidth={2.1}
        >
          {({ additionalData }) => <Subtable data={additionalData} />}
        </Column>
        <Column accessor={['id', 'item']} colWidth={10} />
        <Column accessor="date" format="date" colWidth={10} />
        <Column accessor="item" />
        <Column accessor="qty" alignment="center" colWidth={10} />
        <Column
          accessor="price"
          format="money"
          alignment="right"
          footer={{ value: 'Total:', colSpan: 6 }}
          colWidth={10}
          sortAccessor="price.amount"
        />
        <Column
          header="Row total"
          alignment="right"
          colWidth={10}
          footer={{
            value: formatMoney({ amount: 123456.56, currency: 'EUR' }),
            colSpan: 2,
          }}
        >
          {({ qty, price }) =>
            formatMoney({
              amount: qty * price.amount,
              currency: price.currency,
            })
          }
        </Column>
        {/** Maybe implement emptyFooter prop to avoid using &nbsp; */}
        <Column action="delete" colWidth={2.1} footer="&nbsp;">
          {({ id }, { closeSubrow }) => (
            <Confirm id={id} onClose={closeSubrow} />
          )}
        </Column>
      </Table>
    </div>
  );
};
