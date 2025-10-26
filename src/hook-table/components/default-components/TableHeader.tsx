import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';
import { ComponentProps } from 'react';

type Props = ComponentProps<'thead'>;

export const TableHeader = (props: Props) => {
  const CustomTableHeader = useCustomComponent<Props>('TableHeader');

  if (CustomTableHeader) {
    return <CustomTableHeader {...props} />;
  }

  return <thead {...props} />;
};
