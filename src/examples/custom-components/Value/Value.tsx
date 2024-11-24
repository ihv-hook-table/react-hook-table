import { ComponentProps } from 'react';
import { clsx } from '../../../hook-table/utils';

import classes from './Value.module.css';

type Props = ComponentProps<'div'> & {
  isSecondaryValue?: boolean;
};

export const Value = ({ isSecondaryValue, ...rest }: Props) => (
  <div
    className={clsx(classes.root, isSecondaryValue && classes.secondaryValue)}
    {...rest}
  />
);
