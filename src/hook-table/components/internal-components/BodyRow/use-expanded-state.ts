import { useMemo, useState } from 'react';
import type { ColumnProps, FormatOptions, TableRecord } from '../../../types';
import { isFunction } from '../../../utils';
import { getActionIdentifier } from './utils';

type Props<
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
> = {
  columns: ColumnProps<T, F>[];
  rowData: T;
};

export const useExpandedState = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>({
  columns,
  rowData,
}: Props<T, F>) => {
  const isDefaultExpanded = useMemo(() => {
    const values = columns.filter(({ action }) => !!action);

    const expandedRow = values.filter(({ defaultExpanded }) =>
      isFunction(defaultExpanded) ? defaultExpanded(rowData) : defaultExpanded,
    );

    if (expandedRow.length > 1) {
      console.warn(
        'Multiple defaultExpanded rows detected. Only the first match will be expanded.',
      );
    }

    return expandedRow?.length
      ? getActionIdentifier(expandedRow[0]?.action)
      : undefined;
  }, [columns, rowData]);

  const [expanded, setExpanded] = useState<string | undefined>(
    isDefaultExpanded,
  );

  const { children } =
    columns.find(({ action }) => expanded === getActionIdentifier(action)) ||
    {};

  const closeSubrow = () => setExpanded(undefined);

  const expandableContent = isFunction(children)
    ? children(rowData, { closeSubrow })
    : children;

  const toggleExpanded = (action?: boolean | string) => {
    const actionIdentifier = getActionIdentifier(action);
    const isExpanded = expanded === actionIdentifier;

    setExpanded(expanded && isExpanded ? undefined : actionIdentifier);
  };

  return {
    expanded,
    expandableContent,
    toggleExpanded,
  };
};
