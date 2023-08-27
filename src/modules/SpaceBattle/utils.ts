export const randomValueByRange = (a: number, b: number) => {
  let min = a;
  let max = b;
  if (a > b) {
    min = b;
    max = a;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
};
