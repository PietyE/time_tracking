type ReverseMap<T> = T[keyof T];

type ClassNameWithIsActiveNavLink = ({
  isActive,
}: {
  isActive: boolean;
}) => string;

type SortingOrder = 'asc' | 'desc';

type UserId = string;

type WorkItemId = string;

type ProjectId = string;

interface Owner {
  id: string;
  name: string;
  email: string;
}

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

interface CalendarValues {
  month: number;
  year: number;
}

type UnpackedArray<T> = T extends Array<infer U> ? U : T;
