import { ReactNode } from 'react';
import { clsx } from '../../../hook-table/utils';

import classes from './Value.module.css';

type ValueProps = {
  isSecondaryValue?: boolean;
  value: ReactNode;
};

export const Value = ({ isSecondaryValue, value }: ValueProps) => (
  <div
    className={clsx(classes.root, isSecondaryValue && classes.secondaryValue)}
  >
    {value}
  </div>
);
