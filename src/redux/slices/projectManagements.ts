import { createSlice, isAllOf, type PayloadAction } from '@reduxjs/toolkit';

import get from 'lodash/get';
import {
  archiveProject,
  createNewProject,
  getProjectManagementProject,
  getSelectedModelManageProject,
  getSelectedProjectInModal,
  updateDeveloperProject,
  updateProject,
} from '../asyncActions/projectManagement';
import type { UpdateDeveloperProjectData } from 'api/models/developerProjects';
import type {
  ProjectInModalManage,
  ProjectsWithTotalMinutes,
  ProjectWithTotalMinutes,
} from 'api/models/projects';
import type { User } from 'api/models/users';

interface InitialState {
  isLoading: boolean;
  selectedProject: ProjectWithTotalMinutes;

  selectedDeveloper: Omit<User, 'permissions'>;
  projects: ProjectsWithTotalMinutes;
  isOpenManageModal: boolean;

  selectedProjectInManageModal: ProjectInModalManage;
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
  isOpenManageModal: false,
  selectedProjectInManageModal: {} as ProjectInModalManage,
};

function isProjectWithTotalMinutes(
  action: PayloadAction<ProjectInModalManage | ProjectsWithTotalMinutes>,
): action is PayloadAction<ProjectsWithTotalMinutes> {
  return Array.isArray(action.payload);
}

function isProjectInModalManage(
  action: PayloadAction<ProjectsWithTotalMinutes | ProjectInModalManage>,
): action is PayloadAction<ProjectInModalManage> {
  return get(action.payload, ['projectInfo']);
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
      state.isOpenManageModal = true;
    },
    closeModal: (state) => {
      state.isOpenManageModal = false;
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
    builder.addCase(archiveProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      archiveProject.fulfilled,
      (state, action: PayloadAction<ProjectWithTotalMinutes>) => {
        state.projects = state.projects.map((project) =>
          project.id === action.payload.id ? action.payload : project,
        );
        state.isLoading = false;
      },
    );
    builder.addCase(archiveProject.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getSelectedModelManageProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getSelectedModelManageProject.fulfilled,
      (state, action: PayloadAction<ProjectInModalManage>) => {
        state.isLoading = false;
        state.selectedProjectInManageModal = action.payload;
      },
    );
    builder.addCase(getSelectedModelManageProject.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateProject.fulfilled,
      (state, action: PayloadAction<ProjectInModalManage['projectInfo']>) => {
        state.isLoading = false;
        state.selectedProjectInManageModal.projectInfo = action.payload;
        state.projects = state.projects.map((project) =>
          project.id !== action.payload.id
            ? project
            : { ...project, ...action.payload },
        );
      },
    );
    builder.addCase(updateProject.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateDeveloperProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateDeveloperProject.fulfilled,
      (
        state,
        action: PayloadAction<UpdateDeveloperProjectData & { id: string }>,
      ) => {
        state.isLoading = false;
        state.selectedProjectInManageModal.reports =
          state.selectedProjectInManageModal.reports.map((report) =>
            report.id === action.payload.id
              ? { ...report, ...action.payload }
              : report,
          );
      },
    );
    builder.addCase(updateDeveloperProject.rejected, (state) => {
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
      isAllOf(getSelectedProjectInModal.fulfilled, isProjectInModalManage),
      (state, action) => {
        state.isLoading = false;
        state.selectedProjectInManageModal = action.payload;
        const currentDeveloperProject = action.payload.reports.find(
          (developerProject) =>
            developerProject.project.id === action.payload.projectInfo.id,
        );
        const projectWithTotalMinutes = {
          ...action.payload.projectInfo,
          total_minutes: currentDeveloperProject?.total_minutes,
        } as ProjectWithTotalMinutes;
        state.projects = [projectWithTotalMinutes];
      },
    );
  },
});

export const { selectDeveloper, selectProject, openModal, closeModal } =
  projectManagements.actions;

export default projectManagements.reducer;
