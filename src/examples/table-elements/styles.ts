import { cva } from 'class-variance-authority';

export const cellAlignment = cva('', {
  variants: {
    alignment: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    isMultiValue: {
      true: 'align-top',
      false: 'align-middle',
    },
  },
  defaultVariants: {
    alignment: 'left',
    isMultiValue: false,
  },
});
