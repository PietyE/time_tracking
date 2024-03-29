import type { Project } from './projects';

export interface DeveloperProjectsQueryParams {
  user_id?: string;
  project_id?: string;
}

export interface DeveloperProjectsReportQueryParams
  extends Partial<DeveloperProjectsQueryParams> {
  month: string | number;
  year: string | number;
}

export interface DeveloperProjectPathParams {
  id: string;
  month: string;
  year: string;
}

export interface DeveloperProject {
  id: string;
  project: Project;
  is_full_time: boolean;
  is_project_manager: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  };
  is_active: boolean;
}

export interface UpdateDeveloperProjectData
  extends Partial<
    Pick<DeveloperProject, 'is_full_time' | 'is_project_manager'>
  > {
  is_active?: boolean;
  date?: string;
  month?: number;
  year?: number;
}

export type DeveloperProjects = DeveloperProject[];

export interface CreateDeveloperProjectData
  extends Omit<DeveloperProject, 'id' | 'project'> {
  project: string;
  is_active: boolean;
}

export interface User {
  user_id: string;
  is_full_time: boolean;
  is_active: boolean;
  is_project_manager: boolean;
  date: string;
}

export interface CreateListData {
  project: string;
  users: Array<Partial<User>>;
}

export interface UserReport {
  id: string;
  name: string;
}

export interface DeveloperProjectsReport {
  id: string;
  project: Pick<Project, 'id' | 'name' | 'owner' | 'description'>;
  user: UserReport;
  total_minutes: number;
  overtime_minutes: number;
  is_active: boolean;
  is_project_manager: boolean;
  is_full_time: boolean;
}

export interface DeveloperProjectsReportResponse {
  reports: DeveloperProjectsReport[];
  total_minutes: number;
}
