import { use } from 'react';
import { PaginationContext } from '../../context/pagination-context/pagination-context';
import { useCustomComponent } from '../../context/use-custom-component';
import { PaginationProps } from '../../types';
import { TableOptionsContext } from '@/hook-table/context/table-options-context';

export const Pagination = () => {
  const paginationCtx = use(PaginationContext);
  const { pagination } = use(TableOptionsContext) || {};
  const CustomPagination = useCustomComponent<PaginationProps>('Pagination');

  if (!paginationCtx || !paginationCtx?.state?.paginate || !CustomPagination)
    return null;

  const { nextPage, previousPage, setPageSize, state, goToPage } =
    paginationCtx;

  return (
    <CustomPagination
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
    />
  );
};
