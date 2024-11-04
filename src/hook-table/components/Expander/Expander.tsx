import { useContext } from 'react';
import { TableFormatContext } from '../../context/context';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const Expander = ({ isOpen, setIsOpen }: Props) => {
  const { components } = useContext(TableFormatContext) || {};
  const { Expander: ExternalExpander } = components || {};

  if (ExternalExpander) {
    return <ExternalExpander isOpen={isOpen} setIsOpen={setIsOpen} />;
  }

  return (
    <button className="expander" onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? '-' : '+'}
    </button>
  );
};
