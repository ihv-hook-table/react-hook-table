import { ComponentProps } from 'react';
import classes from './TableHeader.module.css';
import { clsx } from '../../../hook-table/utils';

type Props = ComponentProps<'thead'>;

export const TableHeader = ({ className, ...rest }: Props) => (
  <thead {...rest} className={clsx(classes.root, className)} />
);
