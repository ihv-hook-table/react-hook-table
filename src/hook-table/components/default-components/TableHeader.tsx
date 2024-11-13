import { ComponentProps } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';

type Props = ComponentProps<'thead'>;

export const TableHeader = (props: Props) => {
  const CustomTableHeader = useCustomComponent<Props>('TableHeader');

  if (CustomTableHeader) {
    return <CustomTableHeader {...props} />;
  }

  return <thead {...props} />;
};
