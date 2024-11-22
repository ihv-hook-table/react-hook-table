import { useTable as useHookTable, TableRecord } from '../hook-table';
import {
  Expander,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  Value,
} from './custom-components';
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

// Reusable wrapper hook to provide format functions and custom components

export const useTable = <T extends TableRecord = TableRecord>() => {
  const tableComponents = useHookTable<T, FormatProps>({
    formatFunctions: {
      money: formatMoney,
      date: formatDateFromISOString,
      dateTime: formatDateTimeFromISOString,
      boolean: formatBoolean,
    },
    translate,
    components: {
      Expander,
      Table,
      TableHeader,
      TableHead,
      TableRow,
      TableBody,
      TableData,
      Value,
    },
  });

  return tableComponents;
};
