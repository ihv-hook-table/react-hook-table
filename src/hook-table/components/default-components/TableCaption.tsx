import { forwardRef, HTMLAttributes } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';
import { TableCaptionProps } from '../../types';

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement> & TableCaptionProps
>((props, ref) => {
  const CustomTableCaption = useCustomComponent('TableCaption');

  const { value, ...rest } = props;

  if (!value) {
    return null;
  }

  if (CustomTableCaption) {
    return <CustomTableCaption {...props} />;
  }

  return (
    <caption {...rest} ref={ref}>
      {value}
    </caption>
  );
});
