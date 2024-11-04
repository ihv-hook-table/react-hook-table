import { useState } from 'react';
import { ColumnProps, FormatOptions, TableRecord } from '../../types';
import { Expander } from '../Expander/Expander';
import { ColumnData } from './ColumnData';
import { clsx, isArrayType, isFunction } from '../../utils';

type Props<
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
> = {
  columns: ColumnProps<T, F>[];
  rowData: T;
};

export const TableRow = <T extends TableRecord = TableRecord>({
  columns,
  rowData,
}: Props<T, FormatOptions>) => {
  const { children, defaultExpanded } =
    columns.find(({ expandable }) => expandable) || {};

  const isDefaultExpanded = isFunction(defaultExpanded)
    ? defaultExpanded(rowData)
    : defaultExpanded;

  const [expanded, setExpanded] = useState(isDefaultExpanded || false);

  const isMulti = columns.some(
    ({ accessor }) => isArrayType(accessor) && accessor.length > 1,
  );

  const expandableContent = isFunction(children) ? children(rowData) : children;

  return (
    <>
      <tr className={clsx(expanded && 'expanded')}>
        {columns.map(({ expandable, ...columnRest }, colIndex) => {
          const { alignment = 'left' } = columnRest;

          return (
            <td
              key={colIndex}
              className={clsx(
                !expandable && alignment && `align-${alignment}`,
                !expandable && isMulti && 'multi-line',
              )}
            >
              {expandable ? (
                <Expander isOpen={expanded} setIsOpen={setExpanded} />
              ) : (
                <ColumnData {...columnRest} rowData={rowData} />
              )}
            </td>
          );
        })}
      </tr>

      {expanded && (
        <tr>
          <td colSpan={columns.length} className="expandable">
            {expandableContent}
          </td>
        </tr>
      )}
    </>
  );
};
