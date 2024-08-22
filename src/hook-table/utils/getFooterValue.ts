import { ColumnProps, TableRowType } from '../types';
import { getFooterAccessor } from './getFooterAccessor';
import { isStringType } from './isStringType';
import { getSum } from './getSum';
import { getAverage } from './getAverage';
import { formatMoney } from './formatMoney';

type GetFooterValueProps<T extends TableRowType = TableRowType> = {
  column: ColumnProps<T>;
  data?: T[];
};

export const getFooterValue = <T extends TableRowType = TableRowType>({
  column,
  data,
}: GetFooterValueProps<T>) => {
  const { footer } = column;

  const accessor = getFooterAccessor(column);

  if (accessor && data && !isStringType(footer)) {
    switch (footer?.fn) {
      case 'average':
        return getAverage(data, accessor);
      case 'sumMoney':
        // TODO: Add better currency support
        return formatMoney({
          amount: getSum(data, accessor),
          currency: footer?.sumCurrency || 'EUR',
        });
      case 'sum':
        return getSum(data, accessor);
      default:
        return footer?.value;
    }
  }

  return isStringType(footer) ? footer : footer?.value;
};
