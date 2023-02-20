import { createAsyncThunk } from '@reduxjs/toolkit';
import { changeDeveloperProject } from '../slices/vilmateSinglePage';
import api from 'api';
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
  async (developerProjectId, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.developerProjects.updateDeveloperProject(
        developerProjectId,
        { is_active: false },
      );
      dispatch(
        changeDeveloperProject({
          changedDeveloperProjectData: data,
          developerProjectId,
        }),
      );
    } catch (error) {
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
    { rejectWithValue, dispatch },
  ) => {
    try {
      const { data } = await api.developerProjects.updateDeveloperProject(
        developerProjectId,
        updatedData,
      );
      dispatch(
        changeDeveloperProject({
          changedDeveloperProjectData: data,
          developerProjectId,
        }),
      );
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
