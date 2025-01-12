import { ComponentPropsWithRef } from 'react';
import { TableCaption as CnTableCaption } from '@/components/ui/table';
import { cva } from 'class-variance-authority';
import { TableCaptionProps } from '@/hook-table';
import { cn } from '@/lib/utils';

const captionClasses = cva('', {
  variants: {
    alignment: {
      'top-left': 'caption-top text-left border-b',
      'top-center': 'caption-top text-center',
      'top-right': 'caption-top text-right',
      'bottom-left': 'caption-bottom text-left',
      'bottom-center': 'caption-bottom text-center',
      'bottom-right': 'caption-bottom text-right',
    },
  },
  defaultVariants: {
    alignment: 'top-center',
  },
});

// use div instead of caption to make it work with shadcn/ui table caption component
type Props = ComponentPropsWithRef<'div'> & TableCaptionProps;

export const TableCaption = ({ alignment, className, ...props }: Props) => (
  <CnTableCaption
    className={cn(captionClasses({ alignment }), 'mt-0 p-3', className)}
    {...props}
  />
);
