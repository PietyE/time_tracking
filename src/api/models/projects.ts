import type { DeveloperProjectsReport } from './developerProjects';

export interface ProjectsQueryParams {
  ordering?: string;
  user_id?: string;
}

export interface ProjectsTotalMinutesQueryPathParams
  extends ProjectsQueryParams {
  month: string | number;
  year: string | number;
}

export interface ProjectsReportPathParams {
  id: string;
  month: string | number;
  year: string | number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  logo: string;
  is_archived: boolean;
  owner: {
    id: string;
    name: string;
    email: string;
  };
}

export type Projects = Project[];

export interface CreateProjectData {
  name?: string;
  description?: string;
  is_archived?: boolean;
}

export interface ProjectWithTotalMinutes extends Project {
  total_minutes: number;
}

export interface ProjectInModalManage {
  projectInfo: Project;
  reports: DeveloperProjectsReport[];
}

export type ProjectsWithTotalMinutes = ProjectWithTotalMinutes[];
