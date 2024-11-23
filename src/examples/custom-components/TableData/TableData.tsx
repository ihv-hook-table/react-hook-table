import { ComponentProps } from 'react';

import classes from './TableData.module.css';
import { clsx } from '../../../hook-table/utils';
import { ColumnAlignmentProps } from '../../../hook-table/types';

type Props = ComponentProps<'td'> &
  ColumnAlignmentProps & {
    expandable?: boolean;
  };

export const TableData = ({
  className,
  alignment = 'left',
  expandable,
  isMultiValue,
  ...rest
}: Props) => (
  <td
    {...rest}
    className={clsx(
      classes.root,
      !expandable && classes[alignment],
      !expandable && isMultiValue && classes.multiLine,
      className,
    )}
  />
);
