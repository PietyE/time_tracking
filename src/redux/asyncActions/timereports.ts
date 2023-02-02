import { createAsyncThunk } from '@reduxjs/toolkit';
import { getConsolidatedReport } from './consolidatedReport';
import api from 'api';
import type { RootState } from '../store';
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
  async (workItem, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await api.workItems.createWorkItems(workItem);
      const { calendar } = getState() as RootState;
      void dispatch(
        getConsolidatedReport({
          month: calendar.month + 1,
          year: calendar.year,
        }),
      );
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const updateWorkItem = createAsyncThunk<WorkItem, UpdateWorkItemData>(
  'timereports/updateWorkItem',
  async (workItem, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await api.workItems.updateWorkItem(workItem);
      const { calendar } = getState() as RootState;
      void dispatch(
        getConsolidatedReport({
          month: calendar.month + 1,
          year: calendar.year,
        }),
      );
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const deleteWorkItem = createAsyncThunk<WorkItem, WorkItemId>(
  'timereports/deleteWorkItem',
  async (id, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await api.workItems.deleteWorkItem(id, {
        is_active: false,
      });
      const { calendar } = getState() as RootState;
      void dispatch(
        getConsolidatedReport({
          month: calendar.month + 1,
          year: calendar.year,
        }),
      );
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
