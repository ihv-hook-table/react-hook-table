import { ReactNode } from 'react';
import { clsx } from '../../utils';
import { useCustomComponent } from '../../context/use-custom-component';

type ValueProps = {
  isSecondaryValue?: boolean;
  value: ReactNode;
};

export const Value = ({ isSecondaryValue, value }: ValueProps) => {
  const CustomValue = useCustomComponent<ValueProps>('Value');

  if (CustomValue) {
    return <CustomValue isSecondaryValue={isSecondaryValue} value={value} />;
  }

  return (
    <div className={clsx(isSecondaryValue && 'secondary-value')}>{value}</div>
  );
};
