import { Project } from "./projects";

export interface DeveloperProjectsQueryParams {
  user_id: string;
  project_id: string;
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
  is_full_time: string;
  is_project_manager: boolean;
  user: string;
}

export interface UpdateDeveloperProjectData
  extends Partial<
    Pick<DeveloperProject, "is_full_time" | "is_project_manager">
  > {
  is_active?: boolean;
  date?: string;
}

export type DeveloperProjects = DeveloperProject[];

export interface CreateDeveloperProjectData
  extends Omit<DeveloperProject, "id" | "project"> {
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
  users: User[];
}

export interface UserReport {
  id: string;
  name: string;
}

export interface DeveloperProjectsReport {
  id: string;
  project: Pick<Project, "id" | "name">;
  user: UserReport;
  total_minutes: number;
  overtime_minutes: number;
  is_active: boolean;
  is_project_manager: boolean;
  is_full_time: string;
}

export type DeveloperProjectsReportResponse = DeveloperProjectsReport[];
