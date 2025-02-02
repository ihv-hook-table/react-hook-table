import { use } from 'react';
import { PaginationContext } from '../../context/pagination-context/pagination-context';
import { useCustomComponent } from '../../context/use-custom-component';
import { PaginationProps } from '../../types';
import { TableOptionsContext } from '../../context/table-options-context';

type Props = {
  element: 'TopToolbar' | 'BottomToolbar';
};

export const Toolbar = ({ element }: Props) => {
  const paginationCtx = use(PaginationContext);
  const { pagination } = use(TableOptionsContext) || {};
  const CustomToolbar = useCustomComponent<PaginationProps>(element);

  if (!paginationCtx || !paginationCtx?.state?.paginate || !CustomToolbar)
    return null;

  const { nextPage, previousPage, setPageSize, state, goToPage } =
    paginationCtx;

  return (
    <CustomToolbar
      nextPage={nextPage}
      previousPage={previousPage}
      setPageSize={setPageSize}
      pageNumber={state.pageNumber}
      pageSize={state.pageSize}
      pageSizeOptions={pagination?.pageSizeOptions}
      pageCount={state.pageCount}
      goToPage={goToPage}
      isLastPage={state.isLastPage}
      isManualPagination={state.isManualPagination}
      isLoading={state.isLoading}
    />
  );
};
