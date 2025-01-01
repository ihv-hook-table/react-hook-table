import {
  Expander,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Value,
} from '@/components/ui/table';
import { useTable as useHookTable, TableRecord } from '../hook-table';
import { MoneyType } from './mock-data';
import { formatBoolean } from './value-format/boolean';
import {
  formatDateFromISOString,
  formatDateTimeFromISOString,
} from './value-format/format-date';
import { formatMoney } from './value-format/format-money';
import { translate } from './value-format/translate';

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
      Table,
      TableHeader,
      TableHead,
      TableRow,
      TableBody,
      TableData: TableCell,
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
    translate,
  });

  return tableComponents;
};
