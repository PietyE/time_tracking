import { createSelector } from '@reduxjs/toolkit';
import { type CallBack, createTypedSelector } from '../utils';
import type { DeveloperProjectsReport } from 'api/models/developerProjects';
import type {
  ProjectWithTotalMinutes,
  ProjectsWithTotalMinutes,
  ProjectInModalManage,
  Project,
} from 'api/models/projects';
import type { User } from 'api/models/users';

export const getSelectedProject = createTypedSelector<ProjectWithTotalMinutes>(
  (state) => state.projectManagements.selectedProject,
);
export const getSelectedDeveloper = createTypedSelector<
  Omit<User, 'permissions'>
>((state) => state.projectManagements.selectedDeveloper);

export const getProjectsWithTotalMinutes =
  createTypedSelector<ProjectsWithTotalMinutes>(
    (state) => state.projectManagements.projects,
  );

export const getProjectManagementLoading = createTypedSelector<boolean>(
  (state) => state.projectManagements.isLoading,
);

type ProjectsArray = [ProjectsWithTotalMinutes, ProjectsWithTotalMinutes];

export const getProjectManageModalIsOpen = createTypedSelector<boolean>(
  (state) => state.projectManagements.isOpenManageModal,
);

export const getManageModalProject = createTypedSelector<ProjectInModalManage>(
  (state) => state.projectManagements.selectedProjectInManageModal,
);

export const getManageModalProjectInfo = createTypedSelector<Project>(
  (state) => state.projectManagements.selectedProjectInManageModal.projectInfo,
);

export const getManageModalReports = createTypedSelector<
  DeveloperProjectsReport[]
>((state) => state.projectManagements.selectedProjectInManageModal.reports);

export const getProjectAndArchivedProjects: CallBack<ProjectsArray> =
  createSelector([getProjectsWithTotalMinutes], (projects) =>
    projects.length
      ? projects.reduce(
          (projectsArray: ProjectsArray, project) => {
            if (!project.is_archived) projectsArray[0].push(project);
            else projectsArray[1].push(project);
            return projectsArray;
          },
          [[], []],
        )
      : [[], []],
  );
