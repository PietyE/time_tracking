import { createTypedSelector } from '../utils';
import type { Users } from 'api/models/users';

export const getUsers = createTypedSelector<Users>(
  (state) => state.users.users,
);

export const getUsersLoading = createTypedSelector<boolean>(
  (state) => state.users.isLoading,
);
