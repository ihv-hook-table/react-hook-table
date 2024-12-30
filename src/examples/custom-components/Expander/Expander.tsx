import { TableExpanderProps } from '../../../hook-table';

import classes from './Expander.module.css';

export const Expander = ({
  identifier,
  isOpen,
  toggle,
}: TableExpanderProps) => {
  if (identifier === 'test') {
    return (
      <button className={classes.root} onClick={toggle}>
        {isOpen ? 'Test hide' : 'Test show'}
      </button>
    );
  }
  return (
    <button className={classes.root} onClick={toggle}>
      {isOpen ? 'Hide' : 'Show'}
    </button>
  );
};
