import clsx from "clsx";
import { ColumnProps, TableRowType } from "../../../types";

import classes from "./Cell.module.css";

type HeaderCellProps<T extends TableRowType = TableRowType> = {
  column: ColumnProps<T>;
};

const getLabel = (label?: string | string[]) => {
  if (!label) return undefined;
  if (typeof label === "string") return label;
  if (Array.isArray(label) && label.length === 1) return label[0];

  return label;
};

const CellInner = <T extends TableRowType = TableRowType>(
  column: ColumnProps<T>
) => {
  const { label, accessor } = column || {};
  const adjustedLabel = getLabel(label);

  if (!adjustedLabel && !!accessor) return String(accessor);
  if (typeof adjustedLabel === "string") return adjustedLabel;

  const hasSecondaryLabels = !!adjustedLabel && adjustedLabel.length > 1;

  return adjustedLabel?.map((label, idx) => (
    <div
      key={idx}
      className={clsx(
        hasSecondaryLabels && idx !== 0 && classes.secondaryLabel
      )}
    >
      {label}
    </div>
  ));
};

export const HeaderCell = <T extends TableRowType = TableRowType>({
  column,
}: HeaderCellProps<T>) => {
  const { alignment = "left" } = column || {};

  return (
    <th className={clsx(alignment && classes[`align-${alignment}`])}>
      <CellInner {...column} />
    </th>
  );
};
