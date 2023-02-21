import { Role } from 'constants/profileRoleConstants';
import type { Permissions } from 'constants/permissions';

export interface UsersQueryParams {
  ordering?: string;
  search?: string;
  is_active?: string | boolean;
}

export interface ConsolidatedReportPathQueryParams {
  ordering?: string;
  search?: string;
  project_id?: string;
  month: string | number;
  year: string | number;
}

export interface UserProjectsReportPathParams {
  id: string;
  month: string;
  year: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  position: string;
  role: Role;
  permissions: Permissions[];
  date_of_birth: string;
  phone: string;
  is_active: boolean;
}

export type Users = Array<Omit<User, 'permissions'>>;

export interface UserResponse {
  count_pages: number;
  count_results: number;
  items: Users;
  page: number;
  page_size: number;
}

export interface CreateUserData {
  email: string;
  password: string;
  name?: string;
  position?: string;
  slack?: string;
  date_of_birth?: string;
  phone?: string;
}

export interface DeveloperProject {
  id: string;
  name: string;
  is_active: boolean;
}

export interface ConsolidatedReport {
  id: string;
  email: string;
  name: string;
  total_minutes: number;
  full_time_minutes: number;
  overtime_minutes: number;
  developer_projects: DeveloperProject[];
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface Token {
  key: string;
  expiration_timestamp: string;
  date_create: Date;
  user: string;
}

export interface UserLoginResponse {
  user: User;
  token: Token;
}

export interface Project {
  id: string;
  name: string;
}

export interface DeveloperProjectProjectsReport {
  id: string;
  project: Project;
  is_full_time: boolean;
  is_active: boolean;
  total_minutes: number;
  overtime_minutes: number;
  full_time_minutes: number;
  overtime_amount_uah: string;
  overtime_amount_usd: string;
  overtime_amount_eur: string;
  overtime_amount_uah_uah: string;
  overtime_amount_uah_usd: string;
  overtime_amount_uah_eur: string;
  total_overtime_amount_uah: string;
}

export interface UserProjectsReport {
  id: string;
  email: string;
  name: string;
  developer_projects: DeveloperProjectProjectsReport[];
}
