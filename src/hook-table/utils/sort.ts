import { SortDirection } from '../context/sort-context/types';
import { ColumnsAccessor, TableRecord } from '../types';

export const getSortedData = <
  T extends TableRecord = TableRecord,
  K extends ColumnsAccessor<T> = ColumnsAccessor<T>,
>(
  direction: SortDirection,
  key?: K,
  data?: T[],
  columnFormat?: (value: T[K]) => string,
  locales?: Intl.LocalesArgument,
  options?: Intl.CollatorOptions,
) => {
  if (!Array.isArray(data)) return [];

  if (key == null) return data;

  const collator = new Intl.Collator(locales, {
    numeric: true,
    sensitivity: 'base',
    ...options,
  });

  const copy = data.slice();

  copy.sort((a, b) => {
    const aValue =
      typeof columnFormat === 'function' ? columnFormat(a[key]) : a[key];
    const bValue =
      typeof columnFormat === 'function' ? columnFormat(b[key]) : b[key];

    const compare = collator.compare(String(aValue), String(bValue));
    return direction === 'desc' ? -compare : compare;
  });

  return copy;
};
