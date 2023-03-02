import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { changeDeveloperProject } from '../slices/vilmateSinglePage';
import api from 'api';
import type { RootState } from '../store';
import type {
  DeveloperProjects,
  UpdateDeveloperProjectData,
} from 'api/models/developerProjects';

export const getDeveloperProjects = createAsyncThunk<DeveloperProjects, UserId>(
  'developerProjects/getDeveloperProjects',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.developerProjects.getDeveloperProjects({
        user_id: userId,
      });
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const deleteDeveloperProject = createAsyncThunk<
  undefined,
  DeveloperProjectId
>(
  'developerProjects/deleteDeveloperProject',
  async (developerProjectId, { rejectWithValue, dispatch, getState }) => {
    try {
      const { calendar } = getState() as RootState;
      const { data } = await api.developerProjects.updateDeveloperProject(
        developerProjectId,
        { is_active: false, year: calendar.year, month: calendar.month + 1 },
      );
      dispatch(
        changeDeveloperProject({
          changedDeveloperProjectData: data,
          developerProjectId,
        }),
      );
    } catch (error) {
      toast.error(
        (
          (error as AxiosError)?.response?.data as {
            non_field_errors: string[];
          }
        ).non_field_errors[0] || 'Something went wrong',
      );
      return rejectWithValue((error as Error).message);
    }
  },
);

export const updateDeveloperProject = createAsyncThunk<
  undefined,
  { developerProjectId: string; updatedData: UpdateDeveloperProjectData }
>(
  'developerProjects/updatedDeveloperProject',
  async (
    { developerProjectId, updatedData },
    { rejectWithValue, dispatch, getState },
  ) => {
    try {
      const { calendar } = getState() as RootState;
      const newUpdatedData: UpdateDeveloperProjectData = {
        ...updatedData,
        month: calendar.month + 1,
        year: calendar.year,
      };
      const { data } = await api.developerProjects.updateDeveloperProject(
        developerProjectId,
        newUpdatedData,
      );
      dispatch(
        changeDeveloperProject({
          changedDeveloperProjectData: data,
          developerProjectId,
        }),
      );
    } catch (error) {
      toast.error(
        (
          (error as AxiosError)?.response?.data as {
            non_field_errors: string[];
          }
        ).non_field_errors[0] || 'Something went wrong',
      );
      return rejectWithValue((error as Error).message);
    }
  },
);
