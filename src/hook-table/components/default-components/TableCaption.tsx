import { ComponentProps } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';
import { CaptionProps } from '../../types';

type Props = ComponentProps<'caption'> & CaptionProps;

export const TableCaption = ({ value, ...rest }: Props) => {
  const CustomTableCaption = useCustomComponent<
    ComponentProps<'caption'> & Pick<CaptionProps, 'alignment'>
  >('TableCaption');

  if (!value) {
    return null;
  }

  if (CustomTableCaption) {
    return <CustomTableCaption {...rest}>{value}</CustomTableCaption>;
  }

  return <caption {...rest}>{value}</caption>;
};
