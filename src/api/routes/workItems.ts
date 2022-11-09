import type { AxiosInstance, AxiosPromise } from 'axios';

import CRUD from '../base';
import type {
  WorkItemsQueryParams,
  WorkItemsResponse,
  CreateWorkItemData,
  CreateWorkItemResponse,
  WorkItem,
  WorkItemHistory,
} from '../models/workItems';

export class WorkItemsApi extends CRUD {
  getWorkItems(params: WorkItemsQueryParams): AxiosPromise<WorkItemsResponse> {
    return this.request({
      url: `${this.url}/`,
      params,
    });
  }

  createWorkItems(
    data: CreateWorkItemData,
  ): AxiosPromise<CreateWorkItemResponse> {
    return this.request({
      url: `${this.url}/`,
      method: 'POST',
      data,
    });
  }

  getWorkItemById(id: string): AxiosPromise<WorkItem> {
    return this.request({
      url: `${this.url}/${id}/`,
    });
  }

  updateWorkItem(
    id: string,
    data: Partial<CreateWorkItemData>,
  ): AxiosPromise<WorkItem> {
    return this.request({
      url: `${this.url}/${id}/`,
      method: 'PATCH',
      data,
    });
  }

  getWorkItemHistory(id: string): AxiosPromise<WorkItemHistory> {
    return this.request({
      url: `${this.url}/${id}/work-items-history/`,
    });
  }
}

export default function workItemsApi(request: AxiosInstance) {
  return new WorkItemsApi({
    url: '/work_items',
    request,
  });
}
