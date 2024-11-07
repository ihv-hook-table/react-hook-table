import { ComponentProps, forwardRef, Ref } from 'react';
import { clsx } from '../../../hook-table/utils';

import classes from './Table.module.css';

type Props = ComponentProps<'table'>;

export const Table = forwardRef(
  ({ className, ...rest }: Props, ref: Ref<HTMLTableElement>) => (
    <table {...rest} className={clsx(classes.root, className)} ref={ref} />
  ),
);
