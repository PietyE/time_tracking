import type { AxiosInstance, AxiosPromise } from "axios";

import CRUD from "../base";
import type {
  createTokenData,
  AuthUrlResponse,
  SyncWithGoogleSheetsData,
} from "../models/userHours";

export class UserHoursApi extends CRUD {
  createToken(data: createTokenData): AxiosPromise {
    return this.request({
      url: `${this.url}/create_token/`,
      method: "POST",
      data,
    });
  }

  getAuthUrl(data?: unknown): AxiosPromise<AuthUrlResponse> {
    return this.request({
      url: `${this.url}/get_auth_url/`,
      method: "POST",
      data,
    });
  }

  syncWithGoogleSheets(data: SyncWithGoogleSheetsData): AxiosPromise {
    return this.request({
      url: `${this.url}/sync_with_google_sheets/`,
      method: "POST",
      data,
    });
  }
}

export default function userHoursApi(request: AxiosInstance) {
  return new UserHoursApi({
    url: "/user-hours",
    request,
  });
}
