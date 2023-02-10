import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api';

import type { Projects } from 'api/models/projects';

export const getProjects = createAsyncThunk<Projects>(
  'projects/getProjects',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.projects.getProjects();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
