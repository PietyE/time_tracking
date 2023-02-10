import { createTypedSelector } from '../utils';
import type { Project } from 'api/models/projects';
import type { User } from 'api/models/users';

export const getSelectedProject = createTypedSelector<Project>(
  (state) => state.projectReport.selectedProject,
);
export const getSelectedDeveloper = createTypedSelector<
  Omit<User, 'permissions'>
>((state) => state.projectReport.selectedDeveloper);
