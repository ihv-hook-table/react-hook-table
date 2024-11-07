import { ComponentType, useContext } from 'react';
import { TableFormatContext, TableFormatContextType } from './context';

type TableFormatComponentKeys = keyof NonNullable<
  TableFormatContextType['components']
>;
export const useCustomComponent = <P = object>(
  componentName: TableFormatComponentKeys,
) => {
  const { components } = useContext(TableFormatContext) || {};
  return components?.[componentName] as ComponentType<P>;
};
