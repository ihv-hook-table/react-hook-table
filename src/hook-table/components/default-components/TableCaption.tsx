import { ComponentProps } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';
import { TableCaptionProps } from '../../types';

type Props = ComponentProps<'caption'> & TableCaptionProps;

export const TableCaption = ({ value, ...rest }: Props) => {
  const CustomTableCaption = useCustomComponent<
    ComponentProps<'caption'> & Pick<TableCaptionProps, 'alignment'>
  >('TableCaption');

  if (!value) {
    return null;
  }

  if (CustomTableCaption) {
    return <CustomTableCaption {...rest}>{value}</CustomTableCaption>;
  }

  return <caption {...rest}>{value}</caption>;
};
