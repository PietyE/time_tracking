type ReverseMap<T> = T[keyof T];

type ClassNameWithIsActiveNavLink = ({
  isActive,
}: {
  isActive: boolean;
}) => string;

type SortingOrder = 'asc' | 'desc';

interface OwnerInformation {
  id: string;
  email: string;
  name: string;
}

type OwnerId = string;

type UserId = string;

type DeveloperProjectId = string;

type WorkItemId = string;

type ProjectId = string;

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
