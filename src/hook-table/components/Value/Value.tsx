import clsx from 'clsx';

import classes from './Value.module.css';

export type ValueProps = {
  isSecondaryValue?: boolean;
  value: any;
};

export const Value = ({ isSecondaryValue, value }: ValueProps) => {
  if (typeof value === 'object') {
    throw new Error('The value cannot be an object');
  }

  return (
    <div className={clsx(isSecondaryValue && classes.secondaryValue)}>
      {!!value || value === 0 || typeof value === 'boolean' ? value : '-'}
    </div>
  );
};
