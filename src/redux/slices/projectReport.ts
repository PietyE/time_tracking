import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Project } from 'api/models/projects';
import type { User } from 'api/models/users';

interface InitialState {
  isLoading: boolean;
  selectedProject: Project;

  selectedDeveloper: Omit<User, 'permissions'>;
}

const initialState: InitialState = {
  isLoading: true,
  selectedProject: { name: 'Select All', id: 'Select All' } as Project,
  selectedDeveloper: { name: 'Select All', id: 'Select All' } as Omit<
    User,
    'permissions'
  >,
};

const projectReport = createSlice({
  name: 'projectReport',
  initialState,
  reducers: {
    selectProject: (state, action: PayloadAction<Project>) => {
      state.selectedProject = action.payload;
    },
    selectDeveloper: (
      state,
      action: PayloadAction<Omit<User, 'permissions'>>,
    ) => {
      state.selectedDeveloper = action.payload;
    },
  },
});

export const { selectDeveloper, selectProject } = projectReport.actions;
export default projectReport.reducer;
