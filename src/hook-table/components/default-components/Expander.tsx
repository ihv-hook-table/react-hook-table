import { useCustomComponent } from '../../context/use-custom-component';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  identifier?: string;
};

export const Expander = (props: Props) => {
  const CustomExpander = useCustomComponent('Expander');

  if (CustomExpander) {
    return <CustomExpander {...props} />;
  }

  const { isOpen, toggle } = props;

  return (
    <button className="expander" onClick={toggle}>
      {isOpen ? '-' : '+'}
    </button>
  );
};
