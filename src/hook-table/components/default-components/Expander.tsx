import { useCustomComponent } from '../../context/use-custom-component';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const Expander = (props: Props) => {
  const CustomExpander = useCustomComponent('Expander');

  if (CustomExpander) {
    return <CustomExpander {...props} />;
  }

  const { isOpen, setIsOpen } = props;

  return (
    <button className="expander" onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? '-' : '+'}
    </button>
  );
};
