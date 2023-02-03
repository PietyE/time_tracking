import { createTypedSelector } from '../utils';
import type { Users } from 'api/models/users';

export const getUsers = createTypedSelector<Users>((state) => state.users.data);

export const getUsersLoading = createTypedSelector<boolean>(
  (state) => state.users.isLoading,
);
