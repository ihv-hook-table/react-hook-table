import { use } from 'react';
import { ColumnProps, TableRecord } from '../../../types';
import {
  deepGet,
  getCellValue,
  getFormatFunction,
  isFunction,
  toArray,
} from '../../../utils';
import { Value } from '../../default-components';
import { TableOptionsContext } from '../../../context/table-options-context';

type Props<T extends TableRecord = TableRecord> = ColumnProps<T> & {
  rowData: T;
};

export const ColumnData = <T extends TableRecord = TableRecord>({
  accessor,
  children,
  format,
  rowData,
}: Props<T>) => {
  const childElements = isFunction(children)
    ? children(rowData, { closeSubrow: undefined })
    : children;
  const { formatFunctions } = use(TableOptionsContext) || {};

  if (childElements) {
    return childElements;
  }

  const accessors = toArray(accessor);

  return accessors.map((currentAccessor, index) => {
    const isSecondaryValue = index !== 0;

    const formatFunction = getFormatFunction(index, format, formatFunctions);

    const value = deepGet(rowData, currentAccessor);

    const formattedValue = getCellValue(value, formatFunction);

    return (
      <Value isSecondaryValue={isSecondaryValue} key={index}>
        {formattedValue}
      </Value>
    );
  });
};
