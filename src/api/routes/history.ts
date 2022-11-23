import CRUD from '../base';
import type { AxiosInstance, AxiosPromise } from 'axios';

import type {
  HistoryQueryParams,
  HistoryResponse,
  HistoryItem,
  HistoryFieldResponse,
} from '../models/history';

export class HistoryApi extends CRUD {
  getHistory(
    params: Partial<HistoryQueryParams>,
  ): AxiosPromise<HistoryResponse> {
    return this.request({
      url: `${this.url}/`,
      params,
    });
  }

  getHistoryById(id: string): AxiosPromise<HistoryItem> {
    return this.request({
      url: `${this.url}/${id}/`,
    });
  }

  getHistoryFieldsById(id: string): AxiosPromise<HistoryFieldResponse> {
    return this.request({
      url: `${this.url}/${id}/history-fields/`,
    });
  }
}

export default function historyApi(request: AxiosInstance): HistoryApi {
  return new HistoryApi({
    url: '/history',
    request,
  });
}
