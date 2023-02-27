import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api';
import type { Users, UsersQueryParams } from 'api/models/users';

export const getUsers = createAsyncThunk<Users, UsersQueryParams | undefined>(
  'users/getUsers',
  async (params, { rejectWithValue }) => {
    try {
      if (params) {
        const { data } = await api.users.getUsers(params);
        return data.items;
      }
      const { data } = await api.users.getUsers();
      return data.items;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
