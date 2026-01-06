import { ComponentType, use } from 'react';
import {
  TableOptionsContext,
  TableOptionsContextType,
} from '../context/options-context/options-context';

type TableFormatComponentKeys = keyof NonNullable<
  TableOptionsContextType['components']
>;
export const useCustomComponent = <P = object>(
  componentName: TableFormatComponentKeys,
) => {
  const { components } = use(TableOptionsContext) || {};
  return components?.[componentName] as ComponentType<P>;
};
