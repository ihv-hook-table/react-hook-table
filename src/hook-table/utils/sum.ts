export const sum = (a: number, b: number, positions: number) => {
  const factor = Math.pow(10, positions);
  return (
    (Number(a.toFixed(positions)) * factor +
      Number(b.toFixed(positions)) * factor) /
    factor
  );
};
