import { useState } from 'react';
import { ColumnProps, FormatOptions, TableRecord } from '../../../types';
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

export const BodyRow = <T extends TableRecord = TableRecord>({
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
      <TableRow>
        {columns.map(({ expandable, ...columnRest }, colIndex) => {
          const { alignment = 'left' } = columnRest;

          return (
            <TableData
              key={colIndex}
              alignment={alignment}
              isMulti={isMulti}
              expandable={expandable}
            >
              {expandable ? (
                <Expander isOpen={expanded} setIsOpen={setExpanded} />
              ) : (
                <ColumnData {...columnRest} rowData={rowData} />
              )}
            </TableData>
          );
        })}
      </TableRow>

      {expanded && (
        <TableRow subrow>
          <TableData colSpan={columns.length}>{expandableContent}</TableData>
        </TableRow>
      )}
    </>
  );
};
