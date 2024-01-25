//pure function, depends only on parameters
export function percentDifference(a: number, b: number) {
  return (100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2);
}
