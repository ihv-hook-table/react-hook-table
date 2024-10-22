import { TableRecord, useTable } from '../hook-table';
import { mockData, MoneyType, TableData } from './mock-data';
import { formatMoney } from './value-format/format-money';
import {
  formatDateFromISOString,
  formatDateTimeFromISOString,
} from './value-format/format-date';

// import '../hook-table/hvms-table.css';
import { translate } from './value-format/translate';

// Wrapper hook to provide format functions

type FormatProps = {
  money: (money: MoneyType) => string;
  date: (date: string) => string;
  dateTime: (dateTime: string) => string;
};

const useTableWrapper = <T extends TableRecord = TableRecord>() => {
  const tableComponents = useTable<T, FormatProps>({
    money: formatMoney,
    date: formatDateFromISOString,
    dateTime: formatDateTimeFromISOString,
    translate: translate,
  });

  return tableComponents;
};

// Example component

// TODO: implement expandable rows
// TODO: loading skeletons
// TODO: implement data cell wrapping - default is nowrap. Keep headers nowrap.
// TODO: implement sorting
// TODO: implement toolbar column
// TODO: implement caption - low priority
// TODO: implement row headers - low priority
// TODO: multiple footer rows - low priority

export const HookTableExample = () => {
  const { Column, Table } = useTableWrapper<TableData>();

  return (
    <Table data={mockData} isLoading={false}>
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
