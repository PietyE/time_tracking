import { AxiosInstance, AxiosPromise } from "axios";

import CRUD from "../base";
import {
  UsersQueryParams,
  Users,
  User,
  CreateUserData,
  GoogleAuthData,
  ConsolidatedReportPathQueryParams,
  ConsolidatedReport,
  UserLoginData,
  UserLoginResponse,
  UserProjectsReportPathParams,
  UserProjectsReport,
} from "../models/users";

export class UsersApi extends CRUD {
  getUsers(params?: UsersQueryParams): AxiosPromise<Users> {
    return this.request({
      url: `${this.url}/`,
      params,
    });
  }

  getUsersById(id: string): AxiosPromise<User> {
    return this.request({
      url: `${this.url}/${id}/`,
    });
  }

  createUser(data: CreateUserData): AxiosPromise<User> {
    return this.request({
      url: `${this.url}/`,
      method: "POST",
      data,
    });
  }

  updateUser(id: string, data: CreateUserData): AxiosPromise<User> {
    return this.request({
      url: `${this.url}/${id}/`,
      method: "PUT",
      data,
    });
  }

  updateUserPartial(
    id: string,
    data: Partial<CreateUserData>
  ): AxiosPromise<User> {
    return this.request({
      url: `${this.url}/${id}/`,
      method: "PATCH",
      data,
    });
  }

  login(data: UserLoginData): AxiosPromise<UserLoginResponse> {
    return this.request({
      url: `${this.url}/users/login/`,
      method: "POST",
      data,
    });
  }

  logout(): AxiosPromise<void> {
    return this.request({
      url: `${this.url}/auth/logout/`,
      method: "POST",
    });
  }

  googleAuth(data: GoogleAuthData): AxiosPromise<UserLoginResponse> {
    return this.request({
      url: `${this.url}/auth/social/google/authorize/`,
      method: "POST",
      data,
    });
  }

  getConsolidatedReport({
    year,
    month,
    ...params
  }: ConsolidatedReportPathQueryParams): AxiosPromise<ConsolidatedReport> {
    return this.request({
      url: `${this.url}/consolidated-report/${year}/${month}/`,
      params,
    });
  }

  getProjectsReport({
    year,
    month,
    id,
  }: UserProjectsReportPathParams): AxiosPromise<UserProjectsReport> {
    return this.request({
      url: `${this.url}/${id}/projects-report/${year}/${month}/`,
    });
  }

  toggleProcessedStatus({
    id,
    month,
    year,
  }: UserProjectsReportPathParams): AxiosPromise<void> {
    return this.request({
      url: `${this.url}/${id}/toggle-processed-status/${year}/${month}/`,
      method: "POST",
    });
  }
}

export default function usersApi(request: AxiosInstance) {
  return new UsersApi({
    url: "/users",
    request,
  });
}
