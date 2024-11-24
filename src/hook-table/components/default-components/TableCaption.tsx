import { ComponentProps, ComponentPropsWithRef, forwardRef } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';
import { TableCaptionProps } from '../../types';

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  ComponentProps<'caption'> & TableCaptionProps
>(({ value, ...rest }, ref) => {
  const CustomTableCaption = useCustomComponent<
    ComponentPropsWithRef<'caption'> & Pick<TableCaptionProps, 'alignment'>
  >('TableCaption');

  if (!value) {
    return null;
  }

  if (CustomTableCaption) {
    return (
      <CustomTableCaption {...rest} ref={ref}>
        {value}
      </CustomTableCaption>
    );
  }

  return (
    <caption {...rest} ref={ref}>
      {value}
    </caption>
  );
});
