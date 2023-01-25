import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api';
import type {
  WorkItemsQueryParams,
  WorkItemsResponse,
  CreateWorkItemData,
  UpdateWorkItemData,
  WorkItem,
} from 'api/models/workItems';

export const getWorkItems = createAsyncThunk<
  WorkItemsResponse,
  WorkItemsQueryParams
>('timereports/getWorkItems', async (params, { rejectWithValue }) => {
  try {
    const { data } = await api.workItems.getWorkItems(params);
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const addWorkItem = createAsyncThunk<WorkItem, CreateWorkItemData>(
  'timereports/addWorkItems',
  async (workItem, { rejectWithValue }) => {
    try {
      const { data } = await api.workItems.createWorkItems(workItem);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const updateWorkItem = createAsyncThunk<WorkItem, UpdateWorkItemData>(
  'timereports/updateWorkItem',
  async (workItem, { rejectWithValue }) => {
    try {
      const { data } = await api.workItems.updateWorkItem(workItem);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const deleteWorkItem = createAsyncThunk<WorkItem, WorkItemId>(
  'timereports/deleteWorkItem',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.workItems.deleteWorkItem(id, {
        is_active: false,
      });
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
