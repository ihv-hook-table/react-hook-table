import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';
import { ComponentProps } from 'react';
import { CustomRenderer } from './custom-renderer';

type Props = ComponentProps<'thead'>;

export const TableHeader = (props: Props) => {
  const CustomTableHeader = useCustomComponent<Props>('TableHeader');

  if (CustomTableHeader) {
    return <CustomRenderer Component={CustomTableHeader} props={props} />;
  }

  return <thead {...props} />;
};
