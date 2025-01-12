import { TableExpanderProps } from '@/hook-table';
import {
  LucideChevronDown,
  LucideChevronRight,
  LucideCircleX,
} from 'lucide-react';

// Element that expands the row when clicked.
// If multiple expanders are used, the identifier prop can be used to differentiate them.
export const Expander = ({
  isOpen,
  toggle,
  identifier,
}: TableExpanderProps) => {
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
