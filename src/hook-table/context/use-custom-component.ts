import { ComponentType, use } from 'react';
import {
  TableOptionsContext,
  TableOptionsContextType,
} from './table-options-context';

type TableFormatComponentKeys = keyof NonNullable<
  TableOptionsContextType['components']
>;
export const useCustomComponent = <P = object>(
  componentName: TableFormatComponentKeys,
) => {
  const { components } = use(TableOptionsContext) || {};
  return components?.[componentName] as ComponentType<P>;
};
