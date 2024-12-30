import { ComponentProps } from 'react';
import { clsx } from '../../../hook-table/utils';

import classes from './TableHeader.module.css';

type Props = ComponentProps<'thead'>;

export const TableHeader = ({ className, ...rest }: Props) => (
  <thead {...rest} className={clsx(classes.root, className)} />
);
