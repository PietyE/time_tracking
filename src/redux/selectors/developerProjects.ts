import { createSelector } from '@reduxjs/toolkit';
import { createTypedSelector } from '../utils';
import type { DeveloperProjects } from 'api/models/developerProjects';

export const getDeveloperProject = createTypedSelector<DeveloperProjects>(
  (state) => state.developerProjects.data,
);

export const getOnlyActiveProject = createSelector(
  [getDeveloperProject],
  (projects) =>
    projects.filter(
      (developerProject) => !developerProject.project.is_archived,
    ),
);

export const getDeveloperProjectLoading = createTypedSelector<boolean>(
  (state) => state.developerProjects.isLoading,
);
