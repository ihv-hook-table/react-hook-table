import { useTable as useHookTable, TableRecord } from '../hook-table';
import { MoneyType } from './mock-data';
import { formatBoolean } from './value-format/boolean';
import {
  formatDateFromISOString,
  formatDateTimeFromISOString,
} from './value-format/format-date';
import { formatMoney } from './value-format/format-money';
import { translate } from './value-format/translate';
import { Pagination } from '@/examples/table-elements/pagination';
import {
  Expander,
  TableCaption,
  TableHeader,
  TableBody,
  Table,
  TableData,
  TableFooter,
  TableRow,
  TableHead,
  Value,
} from './table-elements';

type FormatProps = {
  money: (money: MoneyType) => string;
  date: (date: string) => string;
  dateTime: (dateTime: string) => string;
  boolean: (value: boolean) => string;
};

export const useTable = <T extends TableRecord = TableRecord>() => {
  const tableComponents = useHookTable<T, FormatProps>({
    components: {
      Expander,
      Pagination,
      Table,
      TableHeader,
      TableHead,
      TableRow,
      TableBody,
      TableData,
      TableCaption,
      TableFooter,
      Value,
    },
    formatFunctions: {
      money: formatMoney,
      date: formatDateFromISOString,
      dateTime: formatDateTimeFromISOString,
      boolean: formatBoolean,
    },
    pagination: {
      defaultPageSize: 5,
      pageSizeOptions: [5, 10, 20],
    },
    translate,
  });

  return tableComponents;
};
