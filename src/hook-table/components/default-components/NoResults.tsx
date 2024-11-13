import { useCustomComponent } from '../../context/use-custom-component';
import { NoResultsProps } from '../../types';

export const NoResults = ({ isLoading, columnCount }: NoResultsProps) => {
  const CustomNoResults = useCustomComponent<NoResultsProps>('NoResults');

  if (CustomNoResults) {
    return <CustomNoResults isLoading={isLoading} columnCount={columnCount} />;
  }

  return (
    <tbody>
      <tr>
        <td className="align-center" colSpan={columnCount}>
          {isLoading ? 'Loading' : 'No results'}
        </td>
      </tr>
    </tbody>
  );
};
