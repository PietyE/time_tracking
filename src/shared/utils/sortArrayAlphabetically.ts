export const sortArrayAlphabetically = (
  firstElement: string,
  secondElement: string,
): 1 | -1 | 0 => {
  if (firstElement < secondElement) return -1;
  if (firstElement > secondElement) return 1;
  return 0;
};
