import { createTypedSelector } from '../utils';
import { Role } from 'constants/profileRoleConstants';
import type { Permissions } from 'constants/permissions';

export const getIsAuthProfileSelector = createTypedSelector<boolean>(
  (state) => state.profile.isAuth,
);
export const getProfileRoleSelector = createTypedSelector<Role>(
  (state) => state.profile.profileData.role,
);
export const getIsLoadingProfileSelector = createTypedSelector<boolean>(
  (state) => state.profile.isLoading,
);
export const getProfilePermissionsSelector = createTypedSelector<Permissions[]>(
  (state) => state.profile.profileData.permissions,
);
export const getProfileUserNameSelector = createTypedSelector<string>(
  (state) => state.profile.profileData.name,
);
export const getProfileUserPositionSelector = createTypedSelector<string>(
  (state) => state.profile.profileData.position,
);
