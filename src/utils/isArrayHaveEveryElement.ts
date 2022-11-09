export const isArrayHaveEveryElement = <T>(
  arrayToCheck: Array<T>,
  arrayInCheck: Array<T>,
): boolean => arrayToCheck.every((element) => arrayInCheck.includes(element));
