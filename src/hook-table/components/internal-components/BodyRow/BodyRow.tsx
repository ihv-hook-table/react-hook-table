import type { ColumnProps, FormatOptions, TableRecord } from '../../../types';
import { ColumnData } from './ColumnData';
import { TableData, TableRow, Expander } from '../../default-components';
import { RowSelect } from '../../default-components/row-select';
import { useExpandedState } from './use-expanded-state';
import { getActionIdentifier } from './utils';
import { useSelectedState } from './use-selected-state';
import { getFirst } from '../../../utils';

type Props<
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
> = {
  columns: ColumnProps<T, F>[];
  rowData: T;
};

export const BodyRow = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>({
  columns,
  rowData,
}: Props<T, F>) => {
  const { expanded, expandableContent, toggleExpanded } = useExpandedState({
    columns,
    rowData,
  });

  const { isSelected, toggle } = useSelectedState({
    rowData,
  });

  return (
    <>
      <TableRow
        data-expanded={!!expanded}
        data-selected={isSelected(
          getFirst(columns.find(({ select }) => select)?.accessor),
        )}
      >
        {columns.map(({ action, ...columnRest }, colIndex) => {
          const { alignment = 'left', wrap = false } = columnRest;
          const actionIdentifier = getActionIdentifier(action);

          return (
            <TableData
              key={colIndex}
              alignment={alignment}
              expandable={!!action}
              data-wrap={action || columnRest?.select ? false : wrap}
            >
              {action ? (
                <Expander
                  isOpen={expanded === actionIdentifier}
                  toggle={() => toggleExpanded(action)}
                  action={actionIdentifier}
                />
              ) : columnRest?.select ? (
                <RowSelect
                  indeterminate={false}
                  isSelected={isSelected(getFirst(columnRest.accessor))}
                  accessor={getFirst(columnRest.accessor)}
                  toggle={() => toggle(getFirst(columnRest.accessor))}
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
