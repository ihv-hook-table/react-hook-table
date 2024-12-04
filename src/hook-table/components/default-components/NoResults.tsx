import { useCustomComponent } from '../../context/use-custom-component';
import { NoResultsProps } from '../../types';
import { TableBody } from './TableBody';
import { TableData } from './TableData';
import { TableRow } from './TableRow';

export const NoResults = ({ isLoading, columnCount }: NoResultsProps) => {
  const CustomNoResults = useCustomComponent<NoResultsProps>('NoResults');

  if (CustomNoResults) {
    return <CustomNoResults isLoading={isLoading} columnCount={columnCount} />;
  }

  return (
    <TableBody>
      <TableRow>
        <TableData
          colSpan={columnCount}
          className="align-center"
          isMultiValue={false}
        >
          {isLoading ? 'Loading' : 'No results'}
        </TableData>
      </TableRow>
    </TableBody>
  );
};
