import { ComponentProps } from 'react';

import classes from './TableBody.module.css';
import { clsx } from '../../../hook-table/utils';

type Props = ComponentProps<'tbody'>;

export const TableBody = ({ className, ...rest }: Props) => (
  <tbody {...rest} className={clsx(classes.root, className)} />
);
