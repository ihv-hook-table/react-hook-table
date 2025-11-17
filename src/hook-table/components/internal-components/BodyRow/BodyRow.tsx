import { useMemo, useState } from 'react';
import type { ColumnProps, FormatOptions, TableRecord } from '../../../types';
import { ColumnData } from './ColumnData';
import { isArrayType, isFunction } from '../../../utils';
import { TableData, TableRow, Expander } from '../../default-components';

type Props<
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
> = {
  columns: ColumnProps<T, F>[];
  rowData: T;
};

const getExpandableIdentifier = (expandable?: boolean | string) => {
  if (typeof expandable === 'string') {
    return expandable;
  }

  return expandable ? 'default' : undefined;
};

export const BodyRow = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>({
  columns,
  rowData,
}: Props<T, F>) => {
  const isDefaultExpanded = useMemo(() => {
    const values = columns.filter(({ expandable }) => !!expandable);

    const expandedRow = values.filter(({ defaultExpanded }) =>
      isFunction(defaultExpanded) ? defaultExpanded(rowData) : defaultExpanded,
    );

    if (expandedRow.length > 1) {
      console.warn(
        'Multiple defaultExpanded rows detected. Only the first match will be expanded.',
      );
    }

    return expandedRow?.length
      ? getExpandableIdentifier(expandedRow[0]?.expandable)
      : undefined;
  }, [columns, rowData]);

  const [expanded, setExpanded] = useState<string | undefined>(
    isDefaultExpanded,
  );

  const { children } =
    columns.find(
      ({ expandable }) => expanded === getExpandableIdentifier(expandable),
    ) || {};

  const isMultiValue = columns.some(
    ({ accessor }) => isArrayType(accessor) && accessor.length > 1,
  );

  const expandableContent = isFunction(children)
    ? children(rowData, { closeSubrow: () => setExpanded(undefined) })
    : children;

  return (
    <>
      <TableRow expanded={!!expanded}>
        {columns.map(({ expandable, ...columnRest }, colIndex) => {
          const { alignment = 'left', wrap = false } = columnRest;
          const currentIdentifier = getExpandableIdentifier(expandable);
          const isExpanded = expanded === currentIdentifier;

          const toggle = () =>
            setExpanded(expanded && isExpanded ? undefined : currentIdentifier);

          return (
            <TableData
              key={colIndex}
              alignment={alignment}
              isMultiValue={isMultiValue}
              expandable={!!expandable}
              wrap={wrap}
            >
              {expandable ? (
                <Expander
                  isOpen={isExpanded}
                  toggle={toggle}
                  identifier={currentIdentifier}
                />
              ) : (
                <ColumnData {...columnRest} rowData={rowData} />
              )}
            </TableData>
          );
        })}
      </TableRow>

      {expanded && (
        <TableRow subrow>
          <TableData
            data-subrow={true}
            isMultiValue={false}
            colSpan={columns.length}
            wrap={false}
          >
            {expandableContent}
          </TableData>
        </TableRow>
      )}
    </>
  );
};
