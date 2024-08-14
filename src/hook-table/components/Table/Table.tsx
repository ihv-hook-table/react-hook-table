import { DetailedHTMLProps, forwardRef, Ref, TableHTMLAttributes } from "react";

import classes from "./Table.module.css";

export type Props = DetailedHTMLProps<
  TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>;

export const Table = forwardRef((props: Props, ref: Ref<HTMLTableElement>) => {
  return <table {...props} ref={ref} className={classes.root} />;
});
