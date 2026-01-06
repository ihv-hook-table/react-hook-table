import { use } from 'react';
import { NoResultsProps } from '../../types';
import { TableBody } from './TableBody';
import { TableData } from './TableData';
import { TableRow } from './TableRow';
import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';
import { LoadingContext } from '@/hook-table/context/loading-context/loading-context';
import { CustomRenderer } from './custom-renderer';

export const NoResults = ({ columnCount }: NoResultsProps) => {
  const CustomNoResults = useCustomComponent<NoResultsProps>('NoResults');
  const { isLoading } = use(LoadingContext);

  if (CustomNoResults) {
    return (
      <CustomRenderer
        Component={CustomNoResults}
        props={{ isLoading, columnCount }}
      />
    );
  }

  return (
    <TableBody>
      <TableRow>
        <TableData colSpan={columnCount}>
          {isLoading ? 'Loading' : 'No results'}
        </TableData>
      </TableRow>
    </TableBody>
  );
};
