import { ComponentProps } from 'react';
import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';
import { CustomRenderer } from './custom-renderer';

type Props = ComponentProps<'div'>;

export const Value = (props: Props) => {
  const CustomValue = useCustomComponent<Props>('Value');

  if (CustomValue) {
    return <CustomRenderer Component={CustomValue} props={props} />;
  }

  return <div {...props} />;
};
