import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api';
import type {
  ProjectsQueryParams,
  ProjectsWithTotalMinutes,
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
      if (params.user_id && params.user_id === 'Select All') {
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
