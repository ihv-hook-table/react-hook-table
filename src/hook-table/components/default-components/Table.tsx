import { ComponentProps } from 'react';
import { clsx } from '../../utils';
import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';

type Props = ComponentProps<'table'>;

export const Table = ({ className, ...rest }: Props) => {
  const CustomTable = useCustomComponent<Props>('Table');

  if (CustomTable) {
    return <CustomTable {...rest} className={className} />;
  }

  return <table {...rest} className={clsx('ihv-table', className)} />;
};
