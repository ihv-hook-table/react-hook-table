import { useContext } from 'react';
import { ColumnProps, TableRecord } from '../../types';
import {
  deepGet,
  getCellValue,
  getFormatOptions,
  isFunction,
  toArray,
} from '../../utils';
import { Value } from '../Value/Value';
import { TableFormatContext } from '../../context/context';

type Props<T extends TableRecord = TableRecord> = ColumnProps<T> & {
  rowData: T;
};

export const ColumnData = <T extends TableRecord = TableRecord>({
  accessor,
  children,
  format,
  rowData,
}: Props<T>) => {
  const childElements = isFunction(children) && children(rowData);
  const formatOptions = useContext(TableFormatContext);

  if (childElements) {
    return childElements;
  }

  const accessors = toArray(accessor);

  return accessors.map((acc, index) => {
    const isSecondaryValue = index !== 0;

    const formatFunction = getFormatOptions(index, format, formatOptions);

    const cellValue = deepGet(rowData, acc);
    const formattedValue = getCellValue(cellValue, formatFunction);

    return (
      <Value
        value={formattedValue}
        isSecondaryValue={isSecondaryValue}
        key={index}
      />
    );
  });
};
