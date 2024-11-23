import { ComponentProps, forwardRef } from 'react';
import { CaptionProps } from '../../../hook-table/types';
import classes from './TableCaption.module.css';
import { clsx } from '../../../hook-table/utils';

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  ComponentProps<'caption'> & CaptionProps
>(({ className, alignment = 'top-center', ...rest }, ref) => (
  <caption
    {...rest}
    ref={ref}
    className={clsx(classes.root, classes[alignment], className)}
  />
));
