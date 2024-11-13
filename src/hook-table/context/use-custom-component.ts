import { ComponentType, useContext } from 'react';
import {
  TableFormatContext,
  TableOptionsContextType,
} from './table-options-context';

type TableFormatComponentKeys = keyof NonNullable<
  TableOptionsContextType['components']
>;
export const useCustomComponent = <P = object>(
  componentName: TableFormatComponentKeys,
) => {
  const { components } = useContext(TableFormatContext) || {};
  return components?.[componentName] as ComponentType<P>;
};
