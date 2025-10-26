import { ComponentProps } from 'react';
import { clsx } from '../../utils';
import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';

type Props = ComponentProps<'div'> & {
  isSecondaryValue?: boolean;
};

export const Value = ({ isSecondaryValue, ...rest }: Props) => {
  const CustomValue = useCustomComponent<Props>('Value');

  if (CustomValue) {
    return <CustomValue isSecondaryValue={isSecondaryValue} {...rest} />;
  }

  return (
    <div className={clsx(isSecondaryValue && 'secondary-value')} {...rest} />
  );
};
