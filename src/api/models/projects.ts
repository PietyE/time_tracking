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
  owner: OwnerInformation;
}

export type Projects = Project[];

export interface CreateProjectData {
  name: string;
  description?: string;
  is_archived?: boolean;
}

export interface ProjectWithTotalMinutes extends Project {
  total_minutes: number;
}

export type ProjectsWithTotalMinutes = ProjectWithTotalMinutes[];
