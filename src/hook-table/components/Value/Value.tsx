import { clsx } from '../../utils';
import { getCellValue } from '../../utils/getCellValue';

export type ValueProps = {
  isSecondaryValue?: boolean;
  value: unknown;
  format?: 'money' | 'date';
};

export const Value = ({ format, isSecondaryValue, value }: ValueProps) => {
  return (
    <div className={clsx(isSecondaryValue && 'secondary-value')}>
      {getCellValue(value, format)}
    </div>
  );
};
