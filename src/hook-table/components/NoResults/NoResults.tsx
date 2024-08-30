export const NoResults = ({
  isLoading,
  columnCount,
}: {
  isLoading: boolean;
  columnCount: number;
}) => (
  <tbody>
    <tr>
      <td className={'align-center'} colSpan={columnCount}>
        {isLoading ? 'Loading' : 'No results'}
      </td>
    </tr>
  </tbody>
);
