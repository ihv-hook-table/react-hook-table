import { ComponentProps, forwardRef } from 'react';
import { TableCaptionProps } from '../../../hook-table/types';
import classes from './TableCaption.module.css';
import { clsx } from '../../../hook-table/utils';

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  ComponentProps<'caption'> & TableCaptionProps
>(({ className, alignment = 'top-center', ...rest }, ref) => (
  <caption
    {...rest}
    ref={ref}
    className={clsx(classes.root, classes[alignment], className)}
  />
));
