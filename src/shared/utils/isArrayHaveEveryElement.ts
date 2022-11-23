export const isArrayHaveEveryElement = <T>(
  arrayToCheck: T[],
  arrayInCheck: T[],
): boolean => arrayToCheck.every((element) => arrayInCheck.includes(element));
