import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  getSelectedDeveloperProjects,
  getSelectedUser,
  getUserComments,
} from '../asyncActions/vilmateSinglePage';
import type { CommentItem } from 'api/models/comments';
import type {
  DeveloperProject,
  DeveloperProjects,
} from 'api/models/developerProjects';
import type { User } from 'api/models/users';

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
  extraReducers: (builder) => {
    builder.addCase(getSelectedUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getSelectedUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.selectedUser = action.payload;
      },
    );
    builder.addCase(getUserComments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getUserComments.fulfilled,
      (state, action: PayloadAction<CommentItem[]>) => {
        state.isLoading = false;
        state.comments = action.payload;
      },
    );
    builder.addCase(getSelectedDeveloperProjects.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getSelectedDeveloperProjects.fulfilled,
      (state, action: PayloadAction<DeveloperProjects>) => {
        state.isLoading = false;
        state.developerProjects = action.payload;
      },
    );
  },
});

export default vilmateSinglePage.reducer;
