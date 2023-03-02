import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from 'api';
import type {
  DeveloperProjects,
  DeveloperProject,
  CreateListData,
} from 'api/models/developerProjects';
import type { User, CreateUserData } from 'api/models/users';
import type { CommentItem } from 'api/models/comments';

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

export const addDeveloperToProject = createAsyncThunk<
  DeveloperProject,
  CreateListData
>(
  'vilmateSinglePage/addDeveloperToProject',
  async (createListData, { rejectWithValue }) => {
    try {
      const { data } = await api.developerProjects.createList(createListData);
      toast.success('Developer has been add to project');
      return data[0];
    } catch (error) {
      toast.error(
        (
          (error as AxiosError)?.response?.data as {
            non_field_errors: string[];
          }
        ).non_field_errors[0] || 'Developer has not been added to project',
      );
      return rejectWithValue('reject');
    }
  },
);

export const getSelectedVilmatesUser = createAsyncThunk<
  Omit<User, 'permissions'>,
  UserId
>(
  'vilmateSinglePage/getSelectedVilmatesUser',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.users.getUsersById(id);
      return data;
    } catch (error) {
      toast.error('Choose other user');
      return rejectWithValue('reject');
    }
  },
);

export const updateVilmateUser = createAsyncThunk<
  Omit<User, 'permissions'>,
  { id: UserId; updatedUser: Partial<CreateUserData> }
>(
  'vilmateSinglePage/updatedVilmateUser',
  async ({ id, updatedUser }, { rejectWithValue }) => {
    try {
      const { data } = await api.users.updateUserPartial(id, updatedUser);
      toast.success('User has been successfully updated');
      return data;
    } catch (error) {
      toast.error(
        (
          (error as AxiosError)?.response?.data as {
            non_field_errors: string[];
          }
        ).non_field_errors[0] || 'Choose other user',
      );
      return rejectWithValue('reject');
    }
  },
);
