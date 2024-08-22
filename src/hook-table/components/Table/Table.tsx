import { DetailedHTMLProps, forwardRef, Ref, TableHTMLAttributes } from 'react';
import { clsx } from '../../utils';

import classes from './Table.module.css';

export type Props = DetailedHTMLProps<
  TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>;

export const Table = forwardRef(
  ({ className, ...rest }: Props, ref: Ref<HTMLTableElement>) => (
    <table {...rest} ref={ref} className={clsx(classes.root, className)} />
  ),
);
