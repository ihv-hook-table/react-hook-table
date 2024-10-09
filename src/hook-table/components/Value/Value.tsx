import { ReactNode } from 'react';
import { clsx } from '../../utils';

type ValueProps = {
  isSecondaryValue?: boolean;
  value: ReactNode;
};

export const Value = ({ isSecondaryValue, value }: ValueProps) => {
  return (
    <div className={clsx(isSecondaryValue && 'secondary-value')}>{value}</div>
  );
};
