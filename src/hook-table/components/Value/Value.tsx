import clsx from 'clsx';

import classes from './Value.module.css';

export type ValueProps = {
  isSecondaryValue?: boolean;
  value: any;
};

export const Value = ({ isSecondaryValue, value }: ValueProps) => {
  return (
    <div className={clsx(isSecondaryValue && classes.secondaryValue)}>
      {!!value || value === 0 || typeof value === 'boolean' ? value : '-'}
    </div>
  );
};
