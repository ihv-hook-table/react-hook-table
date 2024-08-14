import { ColumnProps, TableRowType } from "../types";

type GetFooterValueProps<T extends TableRowType = TableRowType> = {
  column: ColumnProps<T>;
  data?: T[];
};

export const getFooterValue = <T extends TableRowType = TableRowType>({
  column,
  data,
}: GetFooterValueProps<T>) => {
  const { accessor, footer } = column;

  if (accessor && data) {
    switch (footer?.fn) {
      case "sum":
        return getSumValue({ column, data });
      case "average":
        return getFooterAverage({ column, data });
      default:
    }
  }

  return footer?.value ?? "";
};

const getSumValue = <T extends TableRowType = TableRowType>({
  column,
  data,
}: GetFooterValueProps<T>) => {
  const { accessor } = column || {};

  if (!data || !accessor) return undefined;

  return data.reduce((sum, currentValue) => {
    if (typeof currentValue[accessor] !== "number") {
      throw new Error("The sum function can only be used with number values");
    }

    return sum + currentValue[accessor];
  }, 0);
};

export const getFooterAverage = <T extends TableRowType = TableRowType>({
  column,
  data,
}: GetFooterValueProps<T>) => {
  const { accessor } = column || {};

  if (!data || !accessor) return undefined;

  return (
    data.reduce((sum, currentValue) => {
      if (typeof currentValue[accessor] !== "number") {
        throw new Error(
          "The average function can only be used with number values"
        );
      }

      return sum + currentValue[accessor];
    }, 0) / data.length
  );
};
