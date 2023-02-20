import type { DeveloperProjects } from 'api/models/developerProjects';
import type { Project, Projects } from 'api/models/projects';

export const getTwoArraysDifference = (
  array1: Projects,
  array2: DeveloperProjects,
): Projects => {
  return array1.filter((object1) => {
    return !array2.some((object2) => {
      if (!object2.is_active) {
        return false;
      }
      return object1.id === object2.project.id;
    });
  });
};

export const getDeveloperProjectId = (
  project: Project,
  developerProjects: DeveloperProjects,
): string =>
  developerProjects.reduce(
    (acc, developerProjectId) =>
      developerProjectId.project.id === project.id
        ? developerProjectId.id
        : acc,
    '',
  );
