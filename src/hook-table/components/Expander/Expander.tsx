type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const Expander = ({ isOpen, setIsOpen }: Props) => {
  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? 'Hide' : 'Show'}
    </button>
  );
};
