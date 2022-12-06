import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api';
import type { Users } from 'api/models/users';

export const getVilmatesUsers = createAsyncThunk<Users>(
  'vilmates/getVilmatesUsers',
  async (__, { rejectWithValue }) => {
    try {
      const { data } = await api.users.getUsers();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
