import CRUD from '../base';
import { WorkItemEndpoints } from 'constants/endpoints';
import type { AxiosInstance, AxiosPromise } from 'axios';

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
      url: `${this.url}/${id}${WorkItemEndpoints.WORK_ITEMS_HISTORY}`,
    });
  }
}

export default function workItemsApi(request: AxiosInstance): WorkItemsApi {
  return new WorkItemsApi({
    url: WorkItemEndpoints.WORK_ITEMS,
    request,
  });
}
