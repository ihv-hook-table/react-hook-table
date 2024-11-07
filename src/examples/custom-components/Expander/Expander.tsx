import { ExpanderProps } from '../../../hook-table';

import classes from './Expander.module.css';

export const Expander = ({ isOpen, setIsOpen }: ExpanderProps) => (
  <button className={classes.root} onClick={() => setIsOpen(!isOpen)}>
    {isOpen ? 'Hide' : 'Show'}
  </button>
);
