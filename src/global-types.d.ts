type ReverseMap<T> = T[keyof T];

type ClassNameWithIsActiveNavLink = ({
  isActive,
}: {
  isActive: boolean;
}) => string;

type SortingOrder = 'asc' | 'desc';

type OwnerId = string;

type UserId = string;

interface GoogleAuthCallbackUrlData {
  state: string;
  callback_url: string;
}

interface GoogleAuthRedirectUrlResponse {
  google_auth_url: string;
  state: string;
}

interface GoogleAuthToken {
  token: string;
}
