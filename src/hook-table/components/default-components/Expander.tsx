import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';
import { CustomRenderer } from './custom-renderer';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  identifier?: string;
};

export const Expander = (props: Props) => {
  const CustomExpander = useCustomComponent('Expander');

  if (CustomExpander) {
    return <CustomRenderer Component={CustomExpander} props={props} />;
  }

  const { isOpen, toggle } = props;

  return (
    <button className="expander" onClick={toggle}>
      {isOpen ? '-' : '+'}
    </button>
  );
};
