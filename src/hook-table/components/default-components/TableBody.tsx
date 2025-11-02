import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';
import { ComponentProps } from 'react';
import { CustomRenderer } from './custom-renderer';

type Props = ComponentProps<'tbody'>;

export const TableBody = (props: Props) => {
  const CustomTableBody = useCustomComponent<Props>('TableBody');

  if (CustomTableBody) {
    return <CustomRenderer Component={CustomTableBody} props={props} />;
  }

  return <tbody {...props} />;
};
