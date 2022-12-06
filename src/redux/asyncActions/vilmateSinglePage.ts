import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api';
import type { DeveloperProjects } from 'api/models/developerProjects';
import type { User } from 'api/models/users';
import type { CommentItem } from 'api/models/comments';

export const getSelectedUser = createAsyncThunk<User, string>(
  'vilmateSinglePage/getSelectedUser',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.users.getUsersById(userId);
      return data;
    } catch (error) {
      return rejectWithValue('reject');
    }
  },
);

export const getUserComments = createAsyncThunk<CommentItem[], string>(
  'vilmateSinglePage/getUserComments',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.comments.getComments({ user_id: userId });
      return data.items;
    } catch (error) {
      return rejectWithValue('reject');
    }
  },
);

export const getSelectedDeveloperProjects = createAsyncThunk<
  DeveloperProjects,
  string
>(
  'vilmateSinglePage/getSelectedDeveloperProjects',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.developerProjects.getDeveloperProjects({
        user_id: userId,
      });
      return data;
    } catch (error) {
      return rejectWithValue('reject');
    }
  },
);
