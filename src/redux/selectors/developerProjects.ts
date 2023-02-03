import { createTypedSelector } from '../utils';
import type { DeveloperProjects } from 'api/models/developerProjects';

export const getDeveloperProject = createTypedSelector<DeveloperProjects>(
  (state) => state.developerProjects.data,
);

export const getDeveloperProjectLoading = createTypedSelector<boolean>(
  (state) => state.developerProjects.isLoading,
);
