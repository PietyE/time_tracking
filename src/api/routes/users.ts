import CRUD from '../base';
import { UsersEndpoints } from 'constants/endpoints';
import type { AxiosInstance, AxiosPromise } from 'axios';
import type {
  UserResponse,
  UsersQueryParams,
  User,
  CreateUserData,
  ConsolidatedReportPathQueryParams,
  ConsolidatedReport,
  UserLoginData,
  UserLoginResponse,
  UserProjectsReportPathParams,
  UserProjectsReport,
} from '../models/users';

export class UsersApi extends CRUD {
  getUsers(params?: UsersQueryParams): AxiosPromise<UserResponse> {
    return this.request({
      url: this.url,
      params,
    });
  }

  getUsersById(id: string): AxiosPromise<User> {
    return this.request({
      url: `${this.url}${id}/`,
    });
  }

  createUser(data: CreateUserData): AxiosPromise<User> {
    return this.request({
      url: this.url,
      method: 'POST',
      data,
    });
  }

  updateUser(id: string, data: CreateUserData): AxiosPromise<User> {
    return this.request({
      url: `${this.url}${id}/`,
      method: 'PUT',
      data,
    });
  }

  updateUserPartial(
    id: string,
    data: Partial<CreateUserData>,
  ): AxiosPromise<User> {
    return this.request({
      url: `${this.url}${id}/`,
      method: 'PATCH',
      data,
    });
  }

  login(data: UserLoginData): AxiosPromise<UserLoginResponse> {
    return this.request({
      url: `${this.url}${UsersEndpoints.LOGIN}`,
      method: 'POST',
      data,
    });
  }

  logout(): AxiosPromise<void> {
    return this.request({
      url: `${this.url}${UsersEndpoints.LOGOUT}`,
      method: 'POST',
    });
  }

  getGoogleAuthRedirectUrl(): AxiosPromise<GoogleAuthRedirectUrlResponse> {
    return this.request({
      url: `${this.url}${UsersEndpoints.GET_GOOGLE_AUTH_REDIRECT_URL}`,
      method: 'POST',
    });
  }

  getGoogleAuthToken(
    data: GoogleAuthCallbackUrlData,
  ): AxiosPromise<GoogleAuthToken> {
    return this.request({
      url: `${this.url}${UsersEndpoints.CREATE_GOOGLE_AUTH_TOKEN}`,
      method: 'POST',
      data,
    });
  }

  googleAuth(data: GoogleAuthToken): AxiosPromise<UserLoginResponse> {
    return this.request({
      url: `${this.url}${UsersEndpoints.LOGIN_WITH_GOOGLE_AUTH}`,
      method: 'POST',
      data,
    });
  }

  getConsolidatedReport({
    year,
    month,
    ...params
  }: ConsolidatedReportPathQueryParams): AxiosPromise<ConsolidatedReport[]> {
    return this.request({
      url: `${this.url}${UsersEndpoints.CONSOLIDATE_REPORT}${year}/${month}/`,
      params,
    });
  }

  getProjectsReport({
    year,
    month,
    id,
  }: UserProjectsReportPathParams): AxiosPromise<UserProjectsReport> {
    return this.request({
      url: `${this.url}/${id}${UsersEndpoints.PROJECTS_REPORT}${year}/${month}/`,
    });
  }

  toggleProcessedStatus({
    id,
    month,
    year,
  }: UserProjectsReportPathParams): AxiosPromise<void> {
    return this.request({
      url: `${this.url}/${id}${UsersEndpoints.TOGGLE_PROCESSED_STATUS}${year}/${month}/`,
      method: 'POST',
    });
  }
}

export default function usersApi(request: AxiosInstance): UsersApi {
  return new UsersApi({
    url: UsersEndpoints.USERS,
    request,
  });
}
