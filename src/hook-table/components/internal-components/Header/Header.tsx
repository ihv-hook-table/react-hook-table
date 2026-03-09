import { useColumnContext } from '@/hook-table/context/column-context/column-context';
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
          />
        ))}
      </TableRow>
    </TableHeader>
  );
};
