import { useMemo } from 'react';
import { ExpandableRowProps, TableRecord } from '../types';
import { Expandable } from '../components/Expandable/Expandable';

export const useCreateExpandable = <T extends TableRecord = TableRecord>() => {
  const HookExpandable = useMemo(
    () => (props: ExpandableRowProps<T>) => <Expandable {...props} />,
    [],
  );

  return { Expandable: HookExpandable };
};
