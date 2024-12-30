import { ComponentProps } from 'react';
import { clsx } from '../../../hook-table/utils';
import { TableRowProps } from '../../../hook-table';

import classes from './TableRow.module.css';

type Props = ComponentProps<'tr'> & TableRowProps;

export const TableRow = ({ className, subrow, expanded, ...rest }: Props) => (
  <tr
    {...rest}
    className={clsx(
      classes.root,
      expanded && classes.expanded,
      subrow && classes.subrow,
      className,
    )}
  />
);
