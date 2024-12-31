import { ColumnProps, TableRecord } from '../types';
import { isBooleanType } from './isBooleanType';
import { isObject } from './isObject';

type GetFooterValueProps<T extends TableRecord = TableRecord> = {
  column: ColumnProps<T>;
};

// Allow boolean value to be used as footer value.
// Useful when second to last column has right alignment and colspan would break the alignment.
// Last column can have footer={true} to render empty footer cell.
const handleBoolean = (value: unknown) =>
  isBooleanType(value) && value ? ' ' : value;

export const getFooterProps = <T extends TableRecord = TableRecord>({
  column,
}: GetFooterValueProps<T>) => {
  const { footer } = column;

  const footerAlignment = isObject(footer) ? footer?.alignment : undefined;
  const value = isObject(footer) ? footer?.value : handleBoolean(footer);
  const colSpan = isObject(footer) && footer?.colSpan ? footer.colSpan : 1;

  return {
    footerAlignment,
    colSpan,
    value: value || '-',
  };
};
