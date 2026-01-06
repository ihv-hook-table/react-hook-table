import { ComponentProps } from 'react';
import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';
import { CustomRenderer } from './custom-renderer';

type Props = ComponentProps<'table'>;

export const Table = (props: Props) => {
  const CustomTable = useCustomComponent<Props>('Table');

  if (CustomTable) {
    return <CustomRenderer Component={CustomTable} props={props} />;
  }

  return <table {...props} />;
};
