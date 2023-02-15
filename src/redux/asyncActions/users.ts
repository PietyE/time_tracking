import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api';
import type { Users } from 'api/models/users';

export const getUsers = createAsyncThunk<Users>(
  'users/getUsers',
  async (__, { rejectWithValue }) => {
    try {
      const { data } = await api.users.getUsers();
      return data.items;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
