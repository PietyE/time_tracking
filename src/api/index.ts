import axios, { type AxiosError, type AxiosInstance } from 'axios';
import usersApi, { UsersApi } from './routes/users';

import workItemsApi, { WorkItemsApi } from './routes/workItems';
import historyApi, { HistoryApi } from './routes/history';
import commentsApi, { CommentsApi } from './routes/comments';
import userHoursApi, { UserHoursApi } from './routes/userHours';
import developerProjectsApi, {
  DeveloperProjectsApi,
} from './routes/developerProjects';
import projectsApi, { ProjectsApi } from './routes/projects';
import { logout } from 'store/asyncActions/profile';
import { store } from 'store';
import { ErrorStatus } from 'constants/errorStatus';

type Token = string | null;

class ClientApi {
  private token: Token = null;
  private readonly instance: AxiosInstance;

  public users: UsersApi;
  public workItems: WorkItemsApi;
  public history: HistoryApi;
  public comments: CommentsApi;
  public userHours: UserHoursApi;
  public developerProjects: DeveloperProjectsApi;
  public projects: ProjectsApi;

  constructor(url: string) {
    this.instance = axios.create({
      baseURL: `${url}`,
    });

    this.instance.interceptors.request.use((config) => {
      if (this.token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${this.token}`,
        };
      }

      return config;
    });

    this.instance.interceptors.response.use(
      (res) => res,
      (error: AxiosError) => {
        if (error.response?.status === ErrorStatus.UNAUTHORIZED) {
          void store.dispatch(logout());
        }
        throw error;
      },
    );

    this.users = usersApi(this.instance);
    this.workItems = workItemsApi(this.instance);
    this.history = historyApi(this.instance);
    this.comments = commentsApi(this.instance);
    this.userHours = userHoursApi(this.instance);
    this.developerProjects = developerProjectsApi(this.instance);
    this.projects = projectsApi(this.instance);
  }

  public setToken(token: Token): void {
    this.token = token;
  }
}

const BASE_URL = process.env.REACT_APP_PUBLIC_API_URL;

export default new ClientApi(BASE_URL as string);
