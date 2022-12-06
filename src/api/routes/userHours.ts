import CRUD from '../base';
import { UserHoursEndpoints } from 'constants/endpoints';
import type { AxiosInstance, AxiosPromise } from 'axios';

import type {
  createTokenData,
  AuthUrlResponse,
  SyncWithGoogleSheetsData,
} from '../models/userHours';

export class UserHoursApi extends CRUD {
  createToken(data: createTokenData): AxiosPromise {
    return this.request({
      url: `${this.url}${UserHoursEndpoints.CREATE_TOKEN}`,
      method: 'POST',
      data,
    });
  }

  getAuthUrl(data?: unknown): AxiosPromise<AuthUrlResponse> {
    return this.request({
      url: `${this.url}${UserHoursEndpoints.GET_AUTH_URL}`,
      method: 'POST',
      data,
    });
  }

  syncWithGoogleSheets(data: SyncWithGoogleSheetsData): AxiosPromise {
    return this.request({
      url: `${this.url}${UserHoursEndpoints.SYNC_WITH_GOOGLE_SHEETS}`,
      method: 'POST',
      data,
    });
  }
}

export default function userHoursApi(request: AxiosInstance): UserHoursApi {
  return new UserHoursApi({
    url: UserHoursEndpoints.USER_HOURS,
    request,
  });
}
