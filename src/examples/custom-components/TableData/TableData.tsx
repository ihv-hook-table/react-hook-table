import { ComponentProps } from 'react';

import classes from './TableData.module.css';
import { clsx } from '../../../hook-table/utils';
import { ColumnAlignment } from '../../../hook-table/types';

type Props = ComponentProps<'td'> & {
  alignment?: ColumnAlignment;
  isMulti?: boolean;
  expandable?: boolean;
};

export const TableData = ({
  className,
  alignment = 'left',
  expandable,
  isMulti,
  ...rest
}: Props) => (
  <td
    {...rest}
    className={clsx(
      classes.root,
      !expandable && classes[alignment],
      !expandable && isMulti && classes.multiLine,
      className,
    )}
  />
);
