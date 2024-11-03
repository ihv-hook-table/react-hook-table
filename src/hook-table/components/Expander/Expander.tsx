type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const Expander = ({ isOpen, setIsOpen }: Props) => {
  return (
    <button className="expander" onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? '-' : '+'}
    </button>
  );
};
