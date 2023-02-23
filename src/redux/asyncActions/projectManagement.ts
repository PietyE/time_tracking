import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from 'api';
import type { DeveloperProjectsReportQueryParams } from 'api/models/developerProjects';
import type {
  CreateProjectData,
  Project,
  ProjectsQueryParams,
  ProjectsWithTotalMinutes,
  ProjectWithTotalMinutes,
  ProjectInModalManage,
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
  async ({ project_id }, { rejectWithValue, getState }) => {
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
