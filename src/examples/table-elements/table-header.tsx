import { ComponentPropsWithRef } from 'react';

import { TableHeader as CnTableHeader } from '@/components/ui/table';

type Props = ComponentPropsWithRef<'thead'>;

export const TableHeader = (props: Props) => <CnTableHeader {...props} />;
