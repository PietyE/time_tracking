export const required = (field: string): string => `${field} is required`;

export const maxSymbols = (field: string, count: string): string =>
  `${field} must be less than ${count} symbols`;

export const minSymbols = (field: string, count: string): string =>
  `${field} must be more than ${count} symbols`;
