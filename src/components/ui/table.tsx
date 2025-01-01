import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import {
  ColumnAlignmentProps,
  TableCaptionProps,
  TableExpanderProps,
  TableRowProps,
} from '../../hook-table/types';
import {
  LucideChevronDown,
  LucideChevronRight,
  LucideCircleX,
} from 'lucide-react';
import { ComponentProps } from 'react';

/**
 * @ihv/react-hook-table extra css for shadcn/ui table elements.
 */
const cellClasses = cva('', {
  variants: {
    alignment: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    isMultiValue: {
      true: 'align-top',
      false: 'align-middle',
    },
    expandable: {
      true: 'p-0',
    },
    isSubRow: {
      true: 'bg-white, border-bottom-0 pt-0',
    },
    wrap: {
      true: 'text-wrap',
    },
  },
  defaultVariants: {
    alignment: 'left',
  },
});

const captionClasses = cva('', {
  variants: {
    alignment: {
      'top-left': 'caption-top text-left border-b',
      'top-center': 'caption-top text-center',
      'top-right': 'caption-top text-right',
      'bottom-left': 'caption-bottom text-left',
      'bottom-center': 'caption-bottom text-center',
      'bottom-right': 'caption-bottom text-right',
    },
  },
  defaultVariants: {
    alignment: 'top-center',
  },
});

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  // update selector from [&_tr] to [&>tr]
  <thead ref={ref} className={cn('[&>tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    // update selector from [&_tr] to [&>tr]
    className={cn('[&>tr:last-child]:border-0', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const rowClasses = cva('', {
  variants: {
    subrow: {
      true: 'bg-muted hover:bg-muted [&>td>*]:bg-white [&>td>*]:rounded-sm [&>td>*]:border',
    },
  },
});

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & TableRowProps
>(({ className, expanded, subrow, ...props }, ref) => {
  return (
    <tr
      ref={ref}
      className={cn(
        'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        rowClasses({ subrow }),
        expanded && 'bg-muted border-b-0 hover:bg-muted',
        className,
      )}
      {...props}
    />
  );
});
TableRow.displayName = 'TableRow';

/**
 * TableHead receives  couple of extra props from @ihv/react-hook-table.
 * alignment    - to adjust column alignment. Default is "left".
 * isMultiValue - boolean that indicates if some of the cells has multiple headers.
 */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & ColumnAlignmentProps
>(({ className, ...props }, ref) => {
  const { alignment, isMultiValue, ...rest } = props;

  return (
    <th
      ref={ref}
      className={cn(
        'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        // remove text wrapping
        'text-nowrap',
        cellClasses({ alignment, isMultiValue }),
        className,
      )}
      {...rest}
    />
  );
});
TableHead.displayName = 'TableHead';

/**
 * TableCell receives  couple of extra props from @ihv/react-hook-table.
 * alignment    - to adjust column alignment. Default is "left".
 * isMultiValue - boolean that indicates if some of the cells has multiple headers.
 * expandable   - boolean that indicates if the cell contains row expander button.
 * isSubrow     - can be used to adjust vertical alignment for example.
 * wrap         - boolean that indicates if the cell should wrap text.
 */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> &
    ColumnAlignmentProps & {
      expandable?: boolean;
      isSubRow?: boolean;
      wrap?: boolean;
    }
>(({ className, ...props }, ref) => {
  const { alignment, isMultiValue, expandable, wrap, isSubRow, ...rest } =
    props;

  return (
    <td
      ref={ref}
      className={cn(
        'p-2 align-middle text-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        cellClasses({
          alignment,
          isMultiValue,
          expandable,
          wrap,
          isSubRow,
        }),
        className,
      )}
      {...rest}
    />
  );
});
TableCell.displayName = 'TableCell';

/**
 * TableCaption receives extra prop from @ihv/react-hook-table.
 * alignment - to adjust caption alignment. Default is "top-center".
 */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement> & TableCaptionProps
>(({ className, alignment, ...rest }, ref) => (
  <caption
    ref={ref}
    className={cn(
      'p-3 text-sm text-muted-foreground',
      captionClasses({ alignment }),
      className,
    )}
    {...rest}
  />
));
TableCaption.displayName = 'TableCaption';

export const Value = ({
  isSecondaryValue,
  ...rest
}: ComponentProps<'div'> & {
  isSecondaryValue?: boolean;
}) => {
  return (
    <div
      className={cn(isSecondaryValue && 'text-muted-foreground text-xs')}
      {...rest}
    />
  );
};

const Expander = ({ isOpen, toggle, identifier }: TableExpanderProps) => {
  if (identifier === 'delete') {
    return (
      <button type="button" onClick={toggle} className="p-2">
        <LucideCircleX size={14} className="text-muted-foreground" />
      </button>
    );
  }

  return (
    <button type="button" onClick={toggle} className="p-2">
      {isOpen ? (
        <LucideChevronDown size={14} className="text-muted-foreground" />
      ) : (
        <LucideChevronRight size={14} className="text-muted-foreground" />
      )}
    </button>
  );
};

export {
  Expander,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
