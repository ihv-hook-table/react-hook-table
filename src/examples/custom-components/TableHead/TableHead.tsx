import { ComponentProps } from 'react';
import { clsx } from '../../../hook-table/utils';
import { ColumnAlignmentProps } from '../../../hook-table';

import classes from './TableHead.module.css';

type Props = ComponentProps<'th'> & ColumnAlignmentProps;

export const TableHead = ({
  className,
  alignment = 'left',
  isMultiValue,
  ...rest
}: Props) => (
  <th
    {...rest}
    className={clsx(
      classes.root,
      alignment && classes[alignment],
      isMultiValue && classes.multiLine,
      className,
    )}
  />
);
