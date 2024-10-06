import { ColumnProps, TableRowType } from '../../types';
import {
  consoleWarning,
  deepGet,
  getCellValue,
  getFormatFunction,
  isFunction,
  toArray,
} from '../../utils';
import { Value } from '../Value/Value';

type Props<
  T extends TableRowType = TableRowType,
  F extends TableRowType = TableRowType,
> = ColumnProps<T> & {
  rowData: T;
  formatFunctions?: F;
};

export const ColData = <
  T extends TableRowType = TableRowType,
  F extends TableRowType = TableRowType,
>({
  accessor,
  children,
  format,
  formatFunctions,
  rowData,
}: Props<T>) => {
  const childElements = isFunction(children) && children(rowData);

  if (childElements) {
    consoleWarning(
      !!accessor,
      `[Column]: accessor prop '${accessor}' is ignored and can be removed when children is a function`,
    );

    return childElements;
  }

  const accessors = toArray(accessor);

  return accessors.map((acc, valueIndex) => {
    const isSecondaryValue = valueIndex !== 0;

    const formatFunction = getFormatFunction<F>(
      valueIndex,
      format,
      formatFunctions as F,
    );

    const cellValue = deepGet(rowData, acc);
    const actualValue = getCellValue<F>(cellValue, formatFunction);

    return (
      <Value
        value={actualValue}
        isSecondaryValue={isSecondaryValue}
        key={valueIndex}
      />
    );
  });
};
