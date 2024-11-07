import { ComponentProps } from 'react';

import classes from './TableHead.module.css';
import { clsx } from '../../../hook-table/utils';

type Props = ComponentProps<'th'> & {
  alignment?: 'left' | 'center' | 'right';
  isMulti?: boolean;
};

export const TableHead = ({
  className,
  alignment = 'left',
  isMulti,
  ...rest
}: Props) => (
  <th
    {...rest}
    className={clsx(
      classes.root,
      alignment && classes[alignment],
      isMulti && classes.multiLine,
      className,
    )}
  />
);
