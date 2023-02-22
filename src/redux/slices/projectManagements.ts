import { createSlice, isAllOf, type PayloadAction } from '@reduxjs/toolkit';
import get from 'lodash/get';
import {
  createNewProject,
  getProjectManagementProject,
  getSelectedProjectInModal,
} from '../asyncActions/projectManagement';
import type { DeveloperProjectsReport } from 'api/models/developerProjects';
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
  isOpenModal: boolean;
  selectedProjectInModal: DeveloperProjectsReport;
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
  isOpenModal: false,
  selectedProjectInModal: {} as DeveloperProjectsReport,
};

function isProjectWithTotalMinutes(
  action: PayloadAction<DeveloperProjectsReport | ProjectsWithTotalMinutes>,
): action is PayloadAction<ProjectsWithTotalMinutes> {
  return get(action.payload, ['overtime_minutes']);
}

function isDeveloperProjectsReport(
  action: PayloadAction<ProjectsWithTotalMinutes | DeveloperProjectsReport>,
): action is PayloadAction<DeveloperProjectsReport> {
  return get(action.payload, ['overtime_minutes']);
}

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
    openModal: (state) => {
      state.isOpenModal = true;
    },
    closeModal: (state) => {
      state.isOpenModal = false;
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
    builder.addCase(createNewProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      createNewProject.fulfilled,
      (state, action: PayloadAction<ProjectWithTotalMinutes>) => {
        state.isLoading = false;
        state.projects.push(action.payload);
      },
    );
    builder.addCase(createNewProject.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getSelectedProjectInModal.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getSelectedProjectInModal.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addMatcher(
      isAllOf(getSelectedProjectInModal.fulfilled, isProjectWithTotalMinutes),
      (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      },
    );
    builder.addMatcher(
      isAllOf(getSelectedProjectInModal.fulfilled, isDeveloperProjectsReport),
      (state, action) => {
        state.isLoading = false;
        state.selectedProjectInModal = action.payload;
        state.projects = [action.payload.project] as ProjectsWithTotalMinutes;
      },
    );
  },
});

export const { selectDeveloper, selectProject, openModal, closeModal } =
  projectManagements.actions;

export default projectManagements.reducer;
