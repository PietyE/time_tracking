import { createTypedSelector } from '../utils';
import type { CommentItem } from 'api/models/comments';
import type { DeveloperProject } from 'api/models/developerProjects';
import type { User } from 'api/models/users';

export const getIsLoadingVilmateSinglePage = createTypedSelector<boolean>(
  (state) => state.vilmateSinglePage.isLoading,
);
export const getSelectedUserVilmateSinglePage = createTypedSelector<
  Omit<User, 'permissions'>
>((state) => state.vilmateSinglePage.selectedUser);
export const getCommentsVilmateSinglePage = createTypedSelector<CommentItem[]>(
  (state) => state.vilmateSinglePage.comments,
);
export const getDeveloperProjectsVilmateSinglePage = createTypedSelector<
  DeveloperProject[]
>((state) => state.vilmateSinglePage.developerProjects);
