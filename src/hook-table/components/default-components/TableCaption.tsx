import { ComponentProps } from 'react';
import { CaptionProps } from '../../types';
import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';
import { CustomRenderer } from './custom-renderer';

type Props = ComponentProps<'caption'> & CaptionProps;

export const TableCaption = ({ value, ...rest }: Props) => {
  const CustomTableCaption = useCustomComponent<
    ComponentProps<'caption'> & Pick<CaptionProps, 'alignment'>
  >('TableCaption');

  if (!value) {
    return null;
  }

  if (CustomTableCaption) {
    return (
      <CustomRenderer
        Component={CustomTableCaption}
        props={{ ...rest, children: value }}
      />
    );
  }

  return <caption {...rest}>{value}</caption>;
};
