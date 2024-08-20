export const addNumbers = (a: number, b: number, positions: number) => {
  const result = Number(a.toFixed(positions)) + Number(b.toFixed(positions));
  return Number(result.toFixed(positions));
};
