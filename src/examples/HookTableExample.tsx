import {
  useTable as useHookTable,
  ExpanderProps,
  TableRecord,
} from '../hook-table';
import { AdditionalData, mockData, MoneyType, TableData } from './mock-data';
import { formatMoney } from './value-format/format-money';
import {
  formatDateFromISOString,
  formatDateTimeFromISOString,
} from './value-format/format-date';

// import '../hook-table/ihv-table.css';
import { translate } from './value-format/translate';
import { formatBoolean } from './value-format/boolean';

// Wrapper hook to provide format functions

type FormatProps = {
  money: (money: MoneyType) => string;
  date: (date: string) => string;
  dateTime: (dateTime: string) => string;
  boolean: (value: boolean) => string;
};

type SubTableProps = {
  data: AdditionalData;
};

const Expander = ({ isOpen, setIsOpen }: ExpanderProps) => (
  <button className="expander" onClick={() => setIsOpen(!isOpen)}>
    {isOpen ? 'Hide' : 'Show'}
  </button>
);

const useTable = <T extends TableRecord = TableRecord>() => {
  const tableComponents = useHookTable<T, FormatProps>({
    money: formatMoney,
    date: formatDateFromISOString,
    dateTime: formatDateTimeFromISOString,
    boolean: formatBoolean,
    translate,
    components: {
      Expander,
    },
  });

  return tableComponents;
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

// Example component

// TODO: loading skeletons
// TODO: implement data cell wrapping - default is nowrap. Keep headers nowrap.
// TODO: implement sorting
// TODO: implement caption - low priority
// TODO: implement row headers - low priority
// TODO: multiple footer rows - low priority

export const HookTableExample = () => {
  const { Column, Table } = useTable<TableData>();

  return (
    <Table data={mockData} isLoading={false}>
      <Column
        expandable
        defaultExpanded={({ id }) => ['Row 2', 'Row 4'].includes(id)}
      >
        {({ additionalData }) => <Subtable data={additionalData} />}
      </Column>
      <Column accessor="id" />
      <Column accessor="date" format="dateTime" />
      <Column accessor="item" />
      <Column accessor="qty" alignment="center" />
      <Column accessor="price" format="money" alignment="right" />
      <Column header="Row total" alignment="right" colWidth={10}>
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
