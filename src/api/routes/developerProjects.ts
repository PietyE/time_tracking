import type { AxiosInstance, AxiosPromise } from 'axios';

import CRUD from '../base';
import type {
  DeveloperProjectsQueryParams,
  DeveloperProjects,
  CreateDeveloperProjectData,
  CreateListData,
  DeveloperProjectsReportQueryParams,
  DeveloperProjectsReportResponse,
  DeveloperProject,
  UpdateDeveloperProjectData,
  DeveloperProjectPathParams,
} from '../models/developerProjects';

export class DeveloperProjectsApi extends CRUD {
  getDeveloperProjects(
    params: Partial<DeveloperProjectsQueryParams>,
  ): AxiosPromise<DeveloperProjects> {
    return this.request({
      url: `${this.url}/`,
      params,
    });
  }

  getDeveloperProjectById(id: string): AxiosPromise<DeveloperProject> {
    return this.request({
      url: `${this.url}/${id}/`,
    });
  }

  updateDeveloperProject(
    id: string,
    data: UpdateDeveloperProjectData,
  ): AxiosPromise<Required<UpdateDeveloperProjectData>> {
    return this.request({
      url: `${this.url}/${id}/`,
      data,
      method: 'PATCH',
    });
  }

  createDeveloperProjects(
    data: CreateDeveloperProjectData,
  ): AxiosPromise<CreateDeveloperProjectData> {
    return this.request({
      url: `${this.url}/`,
      data,
      method: 'POST',
    });
  }

  createList(data: CreateListData): AxiosPromise<DeveloperProjects> {
    return this.request({
      url: `${this.url}/create-list/`,
      data,
      method: 'POST',
    });
  }

  getReport({
    year,
    month,
    ...params
  }: DeveloperProjectsReportQueryParams): AxiosPromise<DeveloperProjectsReportResponse> {
    return this.request({
      url: `${this.url}/report/${year}/${month}/`,
      params,
    });
  }

  getReportCsv({ id, month, year }: DeveloperProjectPathParams): AxiosPromise {
    return this.request({
      url: `${this.url}/${id}/export-csv/${year}/${month}/`,
      responseType: 'blob',
    });
  }

  getReportExcel({
    id,
    month,
    year,
  }: DeveloperProjectPathParams): AxiosPromise {
    return this.request({
      url: `${this.url}/${id}/export-excel/${year}/${month}/`,
      responseType: 'blob',
    });
  }
}

export default function developerProjectsApi(request: AxiosInstance) {
  return new DeveloperProjectsApi({
    url: '/developer-projects',
    request,
  });
}
