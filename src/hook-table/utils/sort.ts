import { SortDirection } from '../context/sort-context/types';
import { TableRecord } from '../types';

export const getSortedData = <T extends TableRecord = TableRecord>(
  direction: SortDirection,
  key?: keyof T,
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

  const copy = data.slice();

  copy.sort((a, b) => {
    const compare = collator.compare(String(a[key]), String(b[key]));
    return direction === 'desc' ? -compare : compare;
  });

  return copy;
};
