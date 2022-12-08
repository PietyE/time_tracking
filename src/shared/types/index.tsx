export type ReverseMap<T> = T[keyof T];

export type classNameWithIsActiveNavLink = ({
  isActive,
}: {
  isActive: boolean;
}) => string;
