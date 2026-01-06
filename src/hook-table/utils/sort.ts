import { ColumnAccessor, SortDirection, TableRecord } from '../types';
import { deepGet } from './deepGet';

export const getSortedData = <
  T extends TableRecord = TableRecord,
  K extends ColumnAccessor<T> = ColumnAccessor<T>,
>(
  direction: SortDirection,
  key?: K,
  data?: T[],
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

  const copy = [...data];

  copy.sort((a, b) => {
    const aValue = deepGet(a, key);
    const bValue = deepGet(b, key);

    const compare = collator.compare(String(aValue), String(bValue));
    return direction === 'desc' ? -compare : compare;
  });

  return copy;
};
