import { AxiosInstance, AxiosPromise } from "axios";

import CRUD from "../base";
import {
  HistoryQueryParams,
  HistoryResponse,
  HistoryItem,
  HistoryFieldResponse,
} from "../models/history";

export class HistoryApi extends CRUD {
  getHistory(
    params: Partial<HistoryQueryParams>
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

export default function historyApi(request: AxiosInstance) {
  return new HistoryApi({
    url: "/history",
    request,
  });
}
