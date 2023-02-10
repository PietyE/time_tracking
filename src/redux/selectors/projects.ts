import { createTypedSelector } from '../utils';
import type { Projects } from 'api/models/projects';

export const getProjects = createTypedSelector<Projects>(
  (state) => state.projects.data,
);
export const getIsProjectsLoading = createTypedSelector<boolean>(
  (state) => state.projects.isLoading,
);
