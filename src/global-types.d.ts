type ReverseMap<T> = T[keyof T];

type ClassNameWithIsActiveNavLink = ({
  isActive,
}: {
  isActive: boolean;
}) => string;

type SortingOrder = 'asc' | 'desc';

type OwnerId = string;

type UserId = string;
