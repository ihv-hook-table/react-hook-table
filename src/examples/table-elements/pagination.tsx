import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useLoadingContext,
  usePaginationContext,
  useTableOptionsContext,
} from '@/hook-table';

export const PageSize = () => {
  const { state, setPageSize } = usePaginationContext();
  const { pagination } = useTableOptionsContext();
  const { isLoading } = useLoadingContext();

  const { pageSize } = state;

  if (!state?.paginate) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 pb-4">
      <p className="text-sm font-medium">Rows per page</p>
      <Select
        value={String(pageSize)}
        onValueChange={value => setPageSize(Number(value))}
        disabled={isLoading}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue placeholder={5} />
        </SelectTrigger>
        <SelectContent side="top">
          {pagination?.pageSizeOptions?.map(value => (
            <SelectItem key={value} value={`${value}`}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export function Pagination() {
  const { isLoading } = useLoadingContext();
  const { state, goToPage, nextPage, previousPage } =
    usePaginationContext() || {};

  const { pageNumber, pageCount, isLastPage, isServersidePagination } = state;

  if (!state?.paginate) {
    return null;
  }

  return (
    <div className="flex items-center justify-end py-4">
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        {isServersidePagination
          ? `Page ${pageNumber}`
          : `Page ${pageNumber} of ${pageCount}`}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => goToPage(1)}
          disabled={pageNumber === 1 || (isServersidePagination && isLoading)}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => previousPage()}
          disabled={pageNumber === 1 || (isServersidePagination && isLoading)}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => nextPage()}
          disabled={
            (isServersidePagination && (isLastPage || isLoading)) ||
            (!isServersidePagination && pageNumber === pageCount)
          }
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight />
        </Button>
        {!!pageCount && !isServersidePagination && (
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => goToPage(pageCount || 1)}
            disabled={
              (isServersidePagination && (isLastPage || isLoading)) ||
              (!isServersidePagination && pageNumber === pageCount)
            }
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        )}
      </div>
    </div>
  );
}
