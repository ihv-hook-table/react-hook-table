import { cva } from 'class-variance-authority';

export const cellAlignment = cva('', {
  variants: {
    alignment: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    alignment: 'left',
  },
});
