import { ComponentProps } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';

type Props = ComponentProps<'thead'>;

export const TableHeader = (props: Props) => {
  const TableHeader = useCustomComponent<Props>('TableHeader');

  if (TableHeader) {
    return <TableHeader {...props} />;
  }

  return <thead {...props} />;
};
