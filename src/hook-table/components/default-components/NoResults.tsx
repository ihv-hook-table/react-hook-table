import { use } from 'react';
import { NoResultsProps } from '../../types';
import { TableBody } from './TableBody';
import { TableData } from './TableData';
import { TableRow } from './TableRow';
import { PaginationContext } from '../../context/pagination-context/pagination-context';
import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';

export const NoResults = ({ columnCount }: NoResultsProps) => {
  const CustomNoResults = useCustomComponent<NoResultsProps>('NoResults');
  const { state } = use(PaginationContext) || {};

  if (CustomNoResults) {
    return (
      <CustomNoResults
        isLoading={!!state?.isLoading}
        columnCount={columnCount}
      />
    );
  }

  return (
    <TableBody>
      <TableRow>
        <TableData colSpan={columnCount} isMultiValue={false}>
          {state?.isLoading ? 'Loading' : 'No results'}
        </TableData>
      </TableRow>
    </TableBody>
  );
};
