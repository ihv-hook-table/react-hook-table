import { ComponentProps } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';

type Props = ComponentProps<'caption'>;

export const TableCaption = (props: Props) => {
  const CustomTableCaption = useCustomComponent('TableCaption');

  if (CustomTableCaption) {
    return <CustomTableCaption {...props} />;
  }

  return <caption {...props} />;
};
