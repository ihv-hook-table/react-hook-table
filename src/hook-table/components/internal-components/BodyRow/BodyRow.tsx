import { useMemo, useState } from 'react';
import type { ColumnProps, FormatOptions, TableRecord } from '../../../types';
import { ColumnData } from './ColumnData';
import { isFunction } from '../../../utils';
import { TableData, TableRow, Expander } from '../../default-components';

type Props<
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
> = {
  columns: ColumnProps<T, F>[];
  rowData: T;
};

const getActionIdentifier = (action?: boolean | string) => {
  if (typeof action === 'string') {
    return action;
  }

  return action ? 'default' : undefined;
};

export const BodyRow = <
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

  const expandableContent = isFunction(children)
    ? children(rowData, { closeSubrow: () => setExpanded(undefined) })
    : children;

  return (
    <>
      <TableRow data-expanded={!!expanded}>
        {columns.map(({ action, ...columnRest }, colIndex) => {
          const { alignment = 'left', wrap = false } = columnRest;
          const actionIdentifier = getActionIdentifier(action);
          const isExpanded = expanded === actionIdentifier;

          const toggle = () =>
            setExpanded(expanded && isExpanded ? undefined : actionIdentifier);
          return (
            <TableData
              key={colIndex}
              alignment={alignment}
              expandable={!!action}
              data-wrap={wrap}
            >
              {action ? (
                <Expander
                  isOpen={isExpanded}
                  toggle={toggle}
                  action={actionIdentifier}
                />
              ) : (
                <ColumnData {...columnRest} rowData={rowData} />
              )}
            </TableData>
          );
        })}
      </TableRow>

      {expanded && (
        <TableRow data-subrow={true}>
          <TableData
            data-subrow={true}
            colSpan={columns.length}
            data-wrap={false}
          >
            {expandableContent}
          </TableData>
        </TableRow>
      )}
    </>
  );
};
