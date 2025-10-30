import { useColumnContext } from '@/hook-table/context/column-context/column-context';
import { isArrayType } from '../../../utils';
import { TableHeader, TableRow } from '../../default-components';
import { Cell } from './Cell/Cell';

export const Header = () => {
  const columns = useColumnContext() || [];

  const hasMultiLabels = columns?.some(({ header, accessor }) => {
    const labels = header ?? accessor;
    return isArrayType(labels) && labels.length > 1;
  });

  return (
    <TableHeader>
      <TableRow>
        {columns?.map((col, idx) => (
          <Cell key={idx} column={col} isMultiValue={hasMultiLabels} />
        ))}
      </TableRow>
    </TableHeader>
  );
};
