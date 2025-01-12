import { ComponentPropsWithRef } from 'react';

import { TableHeader as CnTableHeader } from '@/components/ui/table';
import { cn } from '@/lib/utils';

type Props = ComponentPropsWithRef<'thead'>;

export const TableHeader = ({ className, ...rest }: Props) => (
  <CnTableHeader {...rest} className={cn(className)} />
);
