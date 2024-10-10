import { ColumnProps, TableRecord } from '../types';
import { isObject } from './isObject';

type GetFooterValueProps<T extends TableRecord = TableRecord> = {
  column: ColumnProps<T>;
};

export const getFooterValue = <T extends TableRecord = TableRecord>({
  column,
}: GetFooterValueProps<T>) => {
  const { footer } = column;

  return !isObject(footer) ? footer : footer?.value;
};
