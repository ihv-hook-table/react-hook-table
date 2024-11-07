import { ComponentProps } from 'react';
import { clsx } from '../../../hook-table/utils';

import classes from './TableRow.module.css';

type Props = ComponentProps<'tr'> & { expanded?: boolean };

export const TableRow = ({ className, expanded, ...rest }: Props) => (
  <tr
    {...rest}
    className={clsx(classes.root, expanded && classes.expanded, className)}
  />
);
