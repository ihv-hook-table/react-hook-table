import { ComponentProps } from 'react';
import { clsx } from '../../../hook-table/utils';

import classes from './TableRow.module.css';

type Props = ComponentProps<'tr'> & { subrow?: boolean };

export const TableRow = ({ className, subrow, ...rest }: Props) => (
  <tr
    {...rest}
    className={clsx(classes.root, subrow && classes.subrow, className)}
  />
);
