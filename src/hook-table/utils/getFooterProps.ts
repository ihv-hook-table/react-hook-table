import { ColumnProps, TableRecord } from '../types';
import { isObject } from './isObject';

type GetFooterValueProps<T extends TableRecord = TableRecord> = {
  column: ColumnProps<T>;
};

export const getFooterProps = <T extends TableRecord = TableRecord>({
  column,
}: GetFooterValueProps<T>) => {
  const { footer } = column;

  const footerAlignment = isObject(footer) ? footer?.alignment : undefined;
  const value = isObject(footer) ? footer?.value : footer;
  const colSpan = isObject(footer) && footer?.colSpan ? footer.colSpan : 1;

  return {
    footerAlignment,
    colSpan,
    value,
  };
};
