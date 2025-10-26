import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';
import { ComponentProps } from 'react';

type Props = ComponentProps<'tbody'>;

export const TableBody = (props: Props) => {
  const CustomTableBody = useCustomComponent<Props>('TableBody');

  if (CustomTableBody) {
    return <CustomTableBody {...props} />;
  }

  return <tbody {...props} />;
};
