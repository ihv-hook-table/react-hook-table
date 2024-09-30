import { useContext } from 'react';
import { clsx } from '../../utils';
import { getCellValue } from '../../utils/getCellValue';
import { TableContext } from '../../context/table-context';

export type ValueProps = {
  isSecondaryValue?: boolean;
  value: unknown;
  format?: 'money' | 'date';
};

export const Value = ({ format, isSecondaryValue, value }: ValueProps) => {
  const context = useContext(TableContext);

  return (
    <div className={clsx(isSecondaryValue && 'secondary-value')}>
      {getCellValue(value, format, context)}
    </div>
  );
};
