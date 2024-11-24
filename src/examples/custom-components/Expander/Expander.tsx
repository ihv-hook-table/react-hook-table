import { TableExpanderProps } from '../../../hook-table';

import classes from './Expander.module.css';

export const Expander = ({ isOpen, setIsOpen }: TableExpanderProps) => (
  <button className={classes.root} onClick={() => setIsOpen(!isOpen)}>
    {isOpen ? 'Hide' : 'Show'}
  </button>
);
