import { createAsyncThunk } from '@reduxjs/toolkit';
import { getConsolidatedReport } from './consolidatedReport';
import { downloadFile } from 'shared/utils/downloadFile';
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

export const updateWorkItem = createAsyncThunk<
  WorkItem,
  UpdateWorkItemData & Pick<WorkItem, 'id'>
>(
  'timereports/updateWorkItem',
  async (workItem, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await api.workItems.updateWorkItem(workItem);
      const { calendar } = getState() as RootState;
      const { timereports } = getState() as RootState;
      void dispatch(
        getWorkItems({ developer_project: timereports.selectedProject.id }),
      );
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

export const getReportCsv = createAsyncThunk(
  'timereports/getReportCsv',
  async (__, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await api.developerProjects.getReportCsv({
        year: String(state.calendar.year),
        month: String(state.calendar.month + 1),
        id: state.timereports.selectedProject.id,
      });
      const fileName = response.headers['content-disposition'].split('"')[1];
      if (response && response?.data instanceof Blob) {
        downloadFile(response.data, fileName);
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
