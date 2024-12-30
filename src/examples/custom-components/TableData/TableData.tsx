import { ComponentProps } from 'react';
import { clsx } from '../../../hook-table/utils';
import { ColumnAlignmentProps } from '../../../hook-table/types';
import classes from './TableData.module.css';

type Props = ComponentProps<'td'> &
  ColumnAlignmentProps & {
    expandable?: boolean;
    isSubRow?: boolean;
    wrap: boolean;
  };

export const TableData = ({
  className,
  alignment = 'left',
  expandable,
  isMultiValue,
  isSubRow,
  wrap,
  ...rest
}: Props) => (
  <td
    {...rest}
    className={clsx(
      classes.root,
      !expandable && classes[alignment],
      !expandable && isMultiValue && classes.multiLine,
      isSubRow && classes.subrow,
      wrap && classes.wrap,
      className,
    )}
  />
);
