import { useColumnContext } from '@/hook-table/context/column-context/column-context';

export const ColGroup = () => {
  const columns = useColumnContext();

  return (
    <colgroup>
      {columns?.map(({ colWidth }, idx) => (
        <col key={idx} {...(colWidth && { width: `${colWidth}%` })} />
      ))}
    </colgroup>
  );
};
