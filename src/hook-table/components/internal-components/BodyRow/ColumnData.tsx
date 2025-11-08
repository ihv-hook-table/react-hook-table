import type { ColumnProps, FormatOptions, TableRecord } from '../../../types';
import {
  deepGet,
  getCellValue,
  getFormatFunction,
  isFunction,
  toArray,
} from '../../../utils';
import { Value } from '../../default-components';
import { useTableOptionsContext } from '@/hook-table/context/options-context/options-context';

type Props<
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
> = ColumnProps<T, F> & {
  rowData: T;
};

export const ColumnData = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>({
  accessor,
  children,
  format,
  rowData,
}: Props<T, F>) => {
  const { formatFunctions } = useTableOptionsContext() || {};

  const childElements = isFunction(children)
    ? children(rowData, { closeSubrow: undefined })
    : children;

  if (childElements) {
    return childElements;
  }

  const accessors = toArray(accessor);

  return accessors.map((currentAccessor, index) => {
    const isSecondaryValue = index !== 0;

    const formatFunction = getFormatFunction(
      index,
      format,
      formatFunctions as F, // TODO: fix this cast
    );
    const value = deepGet(rowData, currentAccessor);
    const formattedValue = getCellValue(value, formatFunction);

    return (
      <Value isSecondaryValue={isSecondaryValue} key={index}>
        {formattedValue}
      </Value>
    );
  });
};
