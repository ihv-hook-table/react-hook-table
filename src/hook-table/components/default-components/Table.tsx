import { ComponentProps, forwardRef, Ref } from 'react';
import { clsx } from '../../utils';
import { useCustomComponent } from '../../context/use-custom-component';

type Props = ComponentProps<'table'>;

export const Table = forwardRef(
  ({ className, ...rest }: Props, ref: Ref<HTMLTableElement>) => {
    const CustomTable = useCustomComponent<Props>('Table');

    if (CustomTable) {
      return <CustomTable {...rest} className={className} ref={ref} />;
    }

    return (
      <table {...rest} className={clsx('ihv-table', className)} ref={ref} />
    );
  },
);
