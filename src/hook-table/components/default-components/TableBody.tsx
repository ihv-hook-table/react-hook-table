import { ComponentProps } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';

type Props = ComponentProps<'tbody'>;

export const TableBody = (props: Props) => {
  const CustomTableBody = useCustomComponent<Props>('TableBody');

  if (CustomTableBody) {
    return <CustomTableBody {...props} />;
  }

  return <tbody {...props} />;
};
