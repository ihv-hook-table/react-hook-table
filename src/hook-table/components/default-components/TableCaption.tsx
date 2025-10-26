import { ComponentProps } from 'react';
import { CaptionProps } from '../../types';
import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';

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
