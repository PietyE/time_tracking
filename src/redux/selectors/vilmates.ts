import { createTypedSelector } from '../utils';
import type { Users } from 'api/models/users';

export const getIsLoadingVilmatePage = createTypedSelector<boolean>(
  (state) => state.vilmates.isLoading,
);
export const getVilmateUsers = createTypedSelector<Users>(
  (state) => state.vilmates.users,
);
