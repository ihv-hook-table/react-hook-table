import { ReactNode } from 'react';
import { isBooleanType, isObjectType, clsx } from '../../utils';

import classes from './Value.module.css';

export type ValueProps = {
  isSecondaryValue?: boolean;
  value: unknown;
};

export const Value = ({ isSecondaryValue, value }: ValueProps) => {
  if (isObjectType(value)) {
    throw new Error('The value cannot be an object');
  }

  return (
    <div className={clsx(isSecondaryValue && classes.secondaryValue)}>
      {!!value || value === 0 || isBooleanType(value)
        ? (value as ReactNode)
        : '-'}
    </div>
  );
};
