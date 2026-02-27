import { TableExpanderProps } from '@/hook-table';
import {
  LucideChevronDown,
  LucideChevronRight,
  LucideCircleX,
} from 'lucide-react';

// Element that expands the row when clicked.
// If multiple expanders are used, the identifier prop can be used to differentiate them.
export const Expander = ({ isOpen, toggle, action }: TableExpanderProps) => {
  if (action === 'delete') {
    return (
      <button type="button" onClick={toggle} className="p-3">
        <LucideCircleX size={16} className="text-muted-foreground" />
      </button>
    );
  }

  return (
    <div className="h-full flex items-center">
      <button type="button" onClick={toggle} className="p-3">
        {isOpen ? (
          <LucideChevronDown size={20} className="text-muted-foreground" />
        ) : (
          <LucideChevronRight size={20} className="text-muted-foreground" />
        )}
      </button>
    </div>
  );
};
