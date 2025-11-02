import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';
import { CustomRenderer } from './custom-renderer';

type Props = {
  element: 'TopToolbar' | 'BottomToolbar';
};

export const Toolbar = ({ element }: Props) => {
  const CustomToolbar = useCustomComponent(element);

  if (!CustomToolbar) return null;

  return <CustomRenderer Component={CustomToolbar} props={{}} />;
};
