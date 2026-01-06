import { ComponentPropsWithRef } from 'react';
import { Table as CnTable } from '@/components/ui/table';

type Props = ComponentPropsWithRef<'table'>;

export const Table = (props: Props) => {
  return (
    <div className="rounded-md border bg-white">
      <CnTable {...props} />
    </div>
  );
};
