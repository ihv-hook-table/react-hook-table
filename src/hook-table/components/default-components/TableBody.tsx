import { ComponentProps } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';

type Props = ComponentProps<'tbody'>;

export const TableBody = (props: Props) => {
  const TableBody = useCustomComponent<Props>('TableBody');

  if (TableBody) {
    return <TableBody {...props} />;
  }

  return <tbody {...props} />;
};
