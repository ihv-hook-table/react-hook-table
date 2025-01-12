import { ComponentPropsWithRef } from 'react';
import { TableFooter as CnTableFooter } from '@/components/ui/table';

type Props = ComponentPropsWithRef<'tfoot'>;

export const TableFooter = (props: Props) => <CnTableFooter {...props} />;
