import { ComponentProps } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';
import { CaptionProps } from '../../types';

type Props = ComponentProps<'caption'> & CaptionProps;

export const TableCaption = (props: Props) => {
  const CustomTableCaption = useCustomComponent('TableCaption');

  if (CustomTableCaption) {
    return <CustomTableCaption {...props} />;
  }

  const { value, ...rest } = props;

  if (!value) {
    return null;
  }

  return <caption {...rest}>{value}</caption>;
};
