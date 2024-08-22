import { ColumnProps, TableRowType } from '../types';
import { isStringType } from './isStringType';

export const getFooterAccessor = <T extends TableRowType = TableRowType>(
  column: ColumnProps<T>,
) => {
  const { accessor, footer } = column;

  const footerAccessor = isStringType(footer) ? footer : footer?.accessor;
  const colAccessor = isStringType(accessor) ? accessor : accessor?.[0];

  return footerAccessor || colAccessor;
};
