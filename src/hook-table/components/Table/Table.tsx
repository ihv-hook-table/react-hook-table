import { ComponentProps, forwardRef, Ref } from 'react';
import { clsx } from '../../utils';

type Props = ComponentProps<'table'>;

export const Table = forwardRef(
  ({ className, ...rest }: Props, ref: Ref<HTMLTableElement>) => (
    <table {...rest} ref={ref} className={clsx('hvms-table', className)} />
  ),
);
