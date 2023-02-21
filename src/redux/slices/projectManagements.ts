import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getProjectManagementProject } from '../asyncActions/projectManagement';
import type {
  ProjectsWithTotalMinutes,
  ProjectWithTotalMinutes,
} from 'api/models/projects';
import type { User } from 'api/models/users';

interface InitialState {
  isLoading: boolean;
  selectedProject: ProjectWithTotalMinutes;

  selectedDeveloper: Omit<User, 'permissions'>;
  projects: ProjectsWithTotalMinutes;
}

const initialState: InitialState = {
  isLoading: true,
  selectedProject: {
    name: 'Select All',
    id: 'Select All',
  } as ProjectWithTotalMinutes,
  selectedDeveloper: { name: 'Select All', id: 'Select All' } as Omit<
    User,
    'permissions'
  >,
  projects: [],
};

const projectManagements = createSlice({
  name: 'projectManagements',
  initialState,
  reducers: {
    selectProject: (state, action: PayloadAction<ProjectWithTotalMinutes>) => {
      state.selectedProject = action.payload;
    },
    selectDeveloper: (
      state,
      action: PayloadAction<Omit<User, 'permissions'>>,
    ) => {
      state.selectedDeveloper = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProjectManagementProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getProjectManagementProject.fulfilled,
      (state, action: PayloadAction<ProjectsWithTotalMinutes>) => {
        state.isLoading = false;
        state.projects = action.payload;
      },
    );
    builder.addCase(getProjectManagementProject.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { selectDeveloper, selectProject } = projectManagements.actions;

export default projectManagements.reducer;
