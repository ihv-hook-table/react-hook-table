import { ComponentProps } from 'react';
import { clsx } from '../../../hook-table/utils';

import classes from './Table.module.css';

type Props = ComponentProps<'table'>;

export const Table = ({ className, ...rest }: Props) => (
  <table className={clsx(classes.root, className)} {...rest} />
);
