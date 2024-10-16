import { TableRecord, useTable } from '../hook-table';
import { mockData, MoneyType, TableData } from './mock-data';
import { formatMoney } from './value-format/format-money';
import {
  formatDateFromISOString,
  formatDateTimeFromISOString,
} from './value-format/format-date';

import '../hook-table/hvms-table.css';

// Wrapper hook to provide format functions

type FormatProps = {
  money: (money: MoneyType) => string;
  date: (date: string) => string;
  dateTime: (dateTime: string) => string;
};

const useTableWrapper = <T extends TableRecord>() => {
  const tableComponents = useTable<T, FormatProps>({
    money: formatMoney,
    date: formatDateFromISOString,
    dateTime: formatDateTimeFromISOString,
    translate: key => key,
  });

  return tableComponents;
};

// Example component

export const HookTableExample = () => {
  const { Column, Table } = useTableWrapper<TableData>();

  // TODO: implement expandable rows
  // TODO: implement data cell wrapping - default is nowrap
  // TODO: implement toolbar column
  // TODO: display header without header prop (use translated accessor) - medium priority
  // TODO: multiple footer rows - low priority

  return (
    <Table data={mockData} isLoading={false}>
      <Column
        accessor={['id', 'date']}
        colWidth={10}
        header="#"
        format={[undefined, 'date']}
      />
      <Column accessor="date" header="Date" format="dateTime" colWidth={10} />
      <Column accessor="item" header="Item" />
      <Column accessor="qty" header="Qty" alignment="center" colWidth={5} />
      <Column
        accessor="price"
        header="Price"
        alignment="right"
        format="money"
        colWidth={10}
      />
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
