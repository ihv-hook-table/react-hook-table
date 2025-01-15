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
import { PaginationProps } from '@/hook-table';

export function Pagination({
  nextPage,
  previousPage,
  goToPage,
  pageNumber,
  pageCount,
  setPageSize,
  pageSize,
  pageSizeOptions,
  isLastPage,
  isManualPagination,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between mt-4">
      {/* TODO: Row selection*/}
      {/* <div className="flex-1 text-sm text-muted-foreground">
        {1} of {10} row(s) selected.
      </div> */}
      <div />
      <div className="flex items-center space-x-6 lg:space-x-8">
        {pageSizeOptions && (
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={String(pageSize)}
              onValueChange={value => setPageSize(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={5} />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions?.map(value => (
                  <SelectItem key={value} value={`${value}`}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {isManualPagination
            ? `Page ${pageNumber}`
            : `Page ${pageNumber} of ${pageCount}`}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => goToPage(1)}
            disabled={pageNumber === 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => previousPage()}
            disabled={pageNumber === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => nextPage()}
            disabled={
              (isManualPagination && isLastPage) ||
              (!isManualPagination && pageNumber === pageCount)
            }
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          {!!pageCount && !isManualPagination && (
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => goToPage(pageCount || 1)}
              disabled={
                (isManualPagination && isLastPage) ||
                (!isManualPagination && pageNumber === pageCount)
              }
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
