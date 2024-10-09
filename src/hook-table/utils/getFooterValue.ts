import { ColumnProps, TableRecord } from '../types';
import { getFooterAccessor } from './getFooterAccessor';
import { isStringType } from './isStringType';
import { getSum } from './getSum';
import { getAverage } from './getAverage';
import { isObject } from './isObject';

type GetFooterValueProps<T extends TableRecord = TableRecord> = {
  column: ColumnProps<T>;
  data?: T[];
};

export const getFooterValue = <T extends TableRecord = TableRecord>({
  column,
  data,
}: GetFooterValueProps<T>) => {
  const { footer } = column;

  const accessor = getFooterAccessor(column);

  if (accessor && data && !isStringType(footer)) {
    switch (footer?.fn) {
      case 'average':
        return getAverage(data, accessor);
      case 'sum':
        return getSum(data, accessor);
      default:
        return footer?.value;
    }
  }

  return !isObject(footer) ? footer : footer?.value;
};
