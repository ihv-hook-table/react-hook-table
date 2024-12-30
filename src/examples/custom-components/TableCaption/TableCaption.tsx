import { ComponentProps } from 'react';
import { TableCaptionProps } from '../../../hook-table/types';
import classes from './TableCaption.module.css';
import { clsx } from '../../../hook-table/utils';

type Props = ComponentProps<'caption'> & TableCaptionProps;

export const TableCaption = ({
  className,
  alignment = 'top-center',
  ...rest
}: Props) => (
  <caption
    className={clsx(classes.root, classes[alignment], className)}
    {...rest}
  />
);
