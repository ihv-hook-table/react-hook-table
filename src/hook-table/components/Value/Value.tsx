import clsx from 'clsx';

import classes from './Value.module.css';
import { ReactNode } from 'react';

export type ValueProps = {
  isSecondaryValue?: boolean;
  value: unknown;
};

export const Value = ({ isSecondaryValue, value }: ValueProps) => {
  if (typeof value === 'object') {
    throw new Error('The value cannot be an object');
  }

  return (
    <div className={clsx(isSecondaryValue && classes.secondaryValue)}>
      {!!value || value === 0 || typeof value === 'boolean'
        ? (value as ReactNode)
        : '-'}
    </div>
  );
};
