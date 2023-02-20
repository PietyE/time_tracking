import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  addDeveloperToProject,
  getSelectedDeveloperProjects,
  getSelectedVilmatesUser,
  getUserComments,
  updateVilmateUser,
} from '../asyncActions/vilmateSinglePage';
import type { CommentItem } from 'api/models/comments';
import type {
  DeveloperProject,
  DeveloperProjects,
  UpdateDeveloperProjectData,
} from 'api/models/developerProjects';
import type { User, CreateUserData } from 'api/models/users';

interface InitialState {
  isLoading: boolean;
  selectedUser: Omit<User, 'permissions'>;
  comments: CommentItem[];
  developerProjects: DeveloperProject[];
}

const initialState: InitialState = {
  isLoading: true,
  selectedUser: {} as User,
  comments: [],
  developerProjects: [],
};

const vilmateSinglePage = createSlice({
  name: 'vilmateSinglePage',
  initialState,
  reducers: {
    changeDeveloperProject: (
      state,
      action: PayloadAction<{
        changedDeveloperProjectData: Required<UpdateDeveloperProjectData>;
        developerProjectId: string;
      }>,
    ) => {
      state.developerProjects = state.developerProjects.map(
        (developerProject) =>
          developerProject.id === action.payload.developerProjectId
            ? {
                ...developerProject,
                ...action.payload.changedDeveloperProjectData,
              }
            : developerProject,
      );
    },
  },
  extraReducers: (builder) => {
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
    builder.addCase(getUserComments.rejected, (state) => {
      state.isLoading = false;
    });
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
    builder.addCase(getSelectedDeveloperProjects.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addDeveloperToProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      addDeveloperToProject.fulfilled,
      (state, action: PayloadAction<DeveloperProject>) => {
        state.isLoading = false;
        state.developerProjects.push({ ...action.payload, is_active: true });
      },
    );
    builder.addCase(addDeveloperToProject.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getSelectedVilmatesUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getSelectedVilmatesUser.fulfilled,
      (state, action: PayloadAction<Omit<User, 'permissions'>>) => {
        state.isLoading = false;
        state.selectedUser = action.payload;
      },
    );
    builder.addCase(updateVilmateUser.pending, (_state) => {
      // _state.isLoading = true;
    });
    builder.addCase(
      updateVilmateUser.fulfilled,
      (state, action: PayloadAction<Partial<CreateUserData>>) => {
        // state.isLoading = false;
        state.selectedUser = { ...state.selectedUser, ...action.payload };
      },
    );
    builder.addCase(updateVilmateUser.rejected, (_state) => {
      // _state.isLoading = false;
    });
  },
});

export const { changeDeveloperProject } = vilmateSinglePage.actions;

export default vilmateSinglePage.reducer;
