import { useColumnContext } from '@/hook-table/context/column-context/column-context';
import { isArrayType } from '../../../utils';
import { TableHeader, TableRow } from '../../default-components';
import { Cell } from './Cell/Cell';

function getFirstKey(value?: string | string[]): string | undefined {
  if (Array.isArray(value)) {
    return value.length > 0 ? value[0] : undefined;
  }
  return typeof value === 'string' ? value : undefined;
}

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
          <Cell
            key={idx}
            column={{
              ...col,
              sortAccessor: col?.sortAccessor ?? getFirstKey(col.accessor),
            }}
            isMultiValue={hasMultiLabels}
          />
        ))}
      </TableRow>
    </TableHeader>
  );
};
