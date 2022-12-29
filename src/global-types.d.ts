type ReverseMap<T> = T[keyof T];

type ClassNameWithIsActiveNavLink = ({
  isActive,
}: {
  isActive: boolean;
}) => string;
