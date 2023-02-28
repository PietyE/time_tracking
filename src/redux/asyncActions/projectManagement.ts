import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { downloadFile } from '../../shared/utils/downloadFile';
import { closeModal, openModal } from '../slices/projectManagements';
import api from 'api';
import type {
  CreateListData,
  DeveloperProject,
  DeveloperProjectsReportQueryParams,
  UpdateDeveloperProjectData,
} from 'api/models/developerProjects';
import type {
  CreateProjectData,
  Project,
  ProjectInModalManage,
  ProjectsQueryParams,
  ProjectsWithTotalMinutes,
  ProjectWithTotalMinutes,
} from 'api/models/projects';
import type { RootState } from '../store';

export const getProjectManagementProject = createAsyncThunk<
  ProjectsWithTotalMinutes,
  ProjectsQueryParams
>(
  'projectManagement/getProjectManagementProject',
  async (params, { rejectWithValue, getState }) => {
    try {
      // Check after request do we select project or developer to make request based on these filters , can be improved in future
      const state = getState() as RootState;
      if (
        params.user_id &&
        params.user_id === 'Select All' &&
        state.projectManagements.selectedProject.id === 'Select All'
      ) {
        const { data } = await api.projects.getTotalMinutes({
          month: state.calendar.month + 1,
          year: state.calendar.year,
        });
        return data;
      }
      const { data } = await api.projects.getTotalMinutes({
        month: state.calendar.month + 1,
        year: state.calendar.year,
        ...params,
      });
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const createNewProject = createAsyncThunk<
  ProjectWithTotalMinutes,
  CreateProjectData
>(
  'projectManagement/createNewProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const { data } = await api.projects.createProject(projectData);
      const newProject: ProjectWithTotalMinutes = {
        ...data,
        total_minutes: 0,
      };
      toast.success('Project successfully has been created');
      return newProject;
    } catch (error) {
      toast.error('Project has not been created');
      return rejectWithValue('Something went wrong');
    }
  },
);

export const getSelectedProjectInModal = createAsyncThunk<
  ProjectInModalManage | ProjectsWithTotalMinutes,
  Pick<DeveloperProjectsReportQueryParams, 'project_id'>
>(
  'projectManagement/getSelectedProjectInModal',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  async ({ project_id }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { calendar } = getState() as RootState;

      if (!project_id) {
        toast.error('Something went wrong');
        return rejectWithValue('Something went wrong');
      }

      if (project_id === 'Select All') {
        const { data } = await api.projects.getTotalMinutes({
          month: calendar.month + 1,
          year: calendar.year,
        });
        closeModal();
        return data;
      }

      const { data } = await api.projects.getProjectById(project_id);
      const {
        data: { reports },
      } = await api.developerProjects.getReport({
        year: calendar.year,
        month: calendar.month + 1,
        project_id,
      });
      dispatch(openModal());
      return {
        projectInfo: data,
        reports,
      };
    } catch (error) {
      toast.error('Something went wrong');
      return rejectWithValue(error);
    }
  },
);

export const archiveProject = createAsyncThunk<
  ProjectWithTotalMinutes,
  ProjectId
>(
  'projectManagement/archiveProject',
  async (projectId, { rejectWithValue }) => {
    try {
      const { data } = await api.projects.updateProject(projectId, {
        is_archived: true,
      });
      const archivedProject = {
        ...data,
        total_minutes: 0,
      };
      toast.success('You successfully have archived the project');

      return archivedProject;
    } catch (error) {
      toast.error('You have not archived the project');
      return rejectWithValue('Error');
    }
  },
);

export const updateProject = createAsyncThunk<
  Project,
  { id: ProjectId; updatedProject: CreateProjectData }
>(
  'projectManagement/updateProject',
  async (updatedProject, { rejectWithValue }) => {
    try {
      const { data } = await api.projects.updateProject(
        updatedProject.id,
        updatedProject.updatedProject,
      );

      toast.success('You have successfully updated the project');
      return data;
    } catch (error) {
      toast.success('You have not updated the project');
      return rejectWithValue('Error');
    }
  },
);

export const getSelectedModelManageProject = createAsyncThunk<
  ProjectInModalManage,
  ProjectId
>(
  'projectManagement/getSelectedModelManageProject',
  async (projectId, { rejectWithValue, getState }) => {
    try {
      const { calendar } = getState() as RootState;

      const { data } = await api.projects.getProjectById(projectId);
      const {
        data: { reports },
      } = await api.developerProjects.getReport({
        year: calendar.year,
        month: calendar.month + 1,
        project_id: projectId,
      });
      return {
        projectInfo: data,
        reports,
      };
    } catch (error) {
      toast.error('Something went wrong');
      return rejectWithValue('Something went wrong');
    }
  },
);

export const updateDeveloperProject = createAsyncThunk<
  UpdateDeveloperProjectData & { id: string },
  {
    developerProjectId: string;
    updatedData: UpdateDeveloperProjectData;
  }
>(
  'projectManagement/updatedDeveloperProject',
  async ({ developerProjectId, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await api.developerProjects.updateDeveloperProject(
        developerProjectId,
        updatedData,
      );
      return {
        ...data,
        id: developerProjectId,
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const addDevelopersToProject = createAsyncThunk<
  Array<DeveloperProject & { total_minutes: number; overtime_minutes: number }>,
  CreateListData
>(
  'projectManagement/addDeveloperToProject',
  async (creatListData, { rejectWithValue }) => {
    try {
      const { data } = await api.developerProjects.createList(creatListData);
      toast.success('Developer has been added to the project');

      return data.map((report) => ({
        ...report,
        total_minutes: 0,
        overtime_minutes: 0,
      }));
    } catch (error) {
      toast.error('Developer has not been added to the project');
      return rejectWithValue('Something went wrong');
    }
  },
);

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const getReportExcel = createAsyncThunk<void, string>(
  'projectManagement/getReportExcel',
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await api.developerProjects.getReportExcel({
        year: String(state.calendar.year),
        month: String(state.calendar.month + 1),
        id,
      });
      const fileName = response.headers['content-disposition'].split('"')[1];
      if (response && response?.data instanceof Blob) {
        downloadFile(response.data, fileName);
      }
    } catch (error) {
      toast.error((error as AxiosError)?.message || 'Something went wrong');
      return rejectWithValue((error as Error).message);
    }
  },
);
