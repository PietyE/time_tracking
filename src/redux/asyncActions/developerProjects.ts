import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api';
import type { DeveloperProjects } from 'api/models/developerProjects';

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
