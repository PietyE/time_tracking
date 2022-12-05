import { createSlice } from '@reduxjs/toolkit';
import { createTypedSelector } from '../utils';
import type { CommentItem } from 'api/models/comments';
import type { User } from 'api/models/users';
import type { DeveloperProject } from 'api/models/developerProjects';

interface InitialState {
  isLoading: boolean;
  selectedUser: User | Record<string, never>;
  comments: CommentItem[];
  developerProjects: DeveloperProject[];
}

const initialState: InitialState = {
  isLoading: true,
  selectedUser: {},
  comments: [],
  developerProjects: [],
};

const vilmateSinglePage = createSlice({
  name: 'vilmateSinglePage',
  initialState,
  reducers: {},
});

export const getIsLoadingVilmateSinglePage = createTypedSelector<boolean>(
  (state) => state.vilmateSinglePage.isLoading,
);

export const getSelectedUserVilmateSinglePage = createTypedSelector<
  User | Record<string, never>
>((state) => state.vilmateSinglePage.selectedUser);

export const getCommentsVilmateSinglePage = createTypedSelector<CommentItem[]>(
  (state) => state.vilmateSinglePage.comments,
);

export const getDeveloperProjectsVilmateSinglePage = createTypedSelector<
  DeveloperProject[]
>((state) => state.vilmateSinglePage.developerProjects);

export default vilmateSinglePage.reducer;
