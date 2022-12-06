import CRUD from '../base';
import { ProjectsEndpoints } from 'constants/endpoints';
import type { AxiosInstance, AxiosPromise } from 'axios';

import type {
  ProjectsQueryParams,
  Projects,
  CreateProjectData,
  Project,
  ProjectsTotalMinutesQueryPathParams,
  ProjectsWithTotalMinutes,
  ProjectsReportPathParams,
} from '../models/projects';

export class ProjectsApi extends CRUD {
  getProjects(params?: ProjectsQueryParams): AxiosPromise<Projects> {
    return this.request({
      url: this.url,
      params,
    });
  }

  createProject(data: CreateProjectData): AxiosPromise<Project> {
    return this.request({
      url: this.url,
      data,
      method: 'POST',
    });
  }

  getProjectById(id: string): AxiosPromise<Project> {
    return this.request({
      url: `${this.url}${id}/`,
    });
  }

  updateProject(id: string, data: CreateProjectData): AxiosPromise<Project> {
    return this.request({
      url: `${this.url}${id}/`,
      data,
      method: 'PATCH',
    });
  }

  deleteProject(id: string): AxiosPromise<void> {
    return this.request({
      url: `${this.url}${id}/`,
      method: 'DELETE',
    });
  }

  getTotalMinutes({
    month,
    year,
    ...params
  }: ProjectsTotalMinutesQueryPathParams): AxiosPromise<ProjectsWithTotalMinutes> {
    return this.request({
      url: `${this.url}${ProjectsEndpoints.TOTAL_MINUTES}${year}/${month}/`,
      params,
    });
  }

  getProjectsReport({
    month,
    year,
    id,
  }: ProjectsReportPathParams): AxiosPromise {
    return this.request({
      url: `${this.url}${id}${ProjectsEndpoints.EXPORT_EXCEL}${year}/${month}/`,
      responseType: 'blob',
    });
  }
}

export default function projectsApi(request: AxiosInstance): ProjectsApi {
  return new ProjectsApi({
    url: ProjectsEndpoints.PROJECTS,
    request,
  });
}
