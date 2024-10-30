import { useTable as useHookTable } from '../hook-table';
import { AdditionalData, mockData, MoneyType, TableData } from './mock-data';
import { formatMoney } from './value-format/format-money';
import {
  formatDateFromISOString,
  formatDateTimeFromISOString,
} from './value-format/format-date';

// import '../hook-table/hvms-table.css';
import { translate } from './value-format/translate';
import { formatBoolean } from './value-format/boolean';
import { TableRecord } from '../hook-table/types';

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

const useTable = <T extends TableRecord = TableRecord>() => {
  const tableComponents = useHookTable<T, FormatProps>({
    money: formatMoney,
    date: formatDateFromISOString,
    dateTime: formatDateTimeFromISOString,
    boolean: formatBoolean,
    translate,
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

// const UpdatingColumn = () => {
//   const [seconds, setSeconds] = useState(0);
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setSeconds(seconds + 1);
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, [seconds]);

//   return <div>{seconds}</div>;
// };

// Example component

// TODO: loading skeletons
// TODO: implement data cell wrapping - default is nowrap. Keep headers nowrap.
// TODO: implement sorting
// TODO: implement toolbar column
// TODO: implement caption - low priority
// TODO: implement row headers - low priority
// TODO: multiple footer rows - low priority

export const HookTableExample = () => {
  const { Column, Table } = useTable<TableData>();

  return (
    <Table data={mockData} isLoading={false}>
      <Column expandable>
        {({ additionalData }) => <Subtable data={additionalData} />}
      </Column>
      <Column accessor={['id', 'date']} />
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
      {/* <Column colWidth={5} alignment="right">
        <UpdatingColumn />
      </Column> */}
    </Table>
  );
};
