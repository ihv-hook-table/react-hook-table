import { ComponentPropsWithRef, forwardRef } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';
import { TableCaptionProps } from '../../types';

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  ComponentPropsWithRef<'caption'> & TableCaptionProps
>((props, ref) => {
  const CustomTableCaption =
    useCustomComponent<ComponentPropsWithRef<'caption'>>('TableCaption');

  const { value, ...rest } = props;

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
