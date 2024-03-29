import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from 'api';

import { downloadFile } from 'shared/utils/downloadFile';
import type {
  ConsolidatedReport,
  ConsolidatedReportPathQueryParams,
} from 'api/models/users';
import type {
  CreateWorkItemData,
  UpdateWorkItemData,
  WorkItem,
  WorkItemsQueryParams,
  WorkItemsResponse,
} from 'api/models/workItems';
import type { RootState } from '../store';

export const getConsolidatedReport = createAsyncThunk<
  ConsolidatedReport[],
  ConsolidatedReportPathQueryParams
>('timereport/getConsolidatedReport', async (params, { rejectWithValue }) => {
  try {
    const { data } = await api.users.getConsolidatedReport(params);
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const getWorkItems = createAsyncThunk<
  WorkItemsResponse,
  WorkItemsQueryParams
>('timereports/getWorkItems', async (params, { rejectWithValue }) => {
  try {
    const { data } = await api.workItems.getWorkItems(params);
    return data;
  } catch (error) {
    toast.error((error as AxiosError)?.message || 'Something went wrong');
    return rejectWithValue((error as Error).message);
  }
});

export const addWorkItem = createAsyncThunk<WorkItem, CreateWorkItemData>(
  'timereports/addWorkItems',
  async (workItem, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await api.workItems.createWorkItems(workItem);
      const { calendar } = getState() as RootState;
      toast.success('Work item has been added');
      void dispatch(
        getConsolidatedReport({
          month: calendar.month + 1,
          year: calendar.year,
        }),
      );
      return data;
    } catch (error) {
      toast.error(
        (error as AxiosError)?.message || 'Work item has not been added',
      );
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
      const state = getState() as RootState;
      // check if workItem have field developer project (id) in payload
      // if true that is mean that we are trying to swap project
      // from selected and move to developer project in payload
      // after call work items with selected developer project (id) to update UI
      if (workItem?.developer_project) {
        void dispatch(
          getWorkItems({
            developer_project: state.timereports.selectedProject.id,
            month: state.calendar.month + 1,
            year: state.calendar.year,
          }),
        );
      }
      toast.success('Work item has been successfully updated');
      void dispatch(
        getConsolidatedReport({
          month: state.calendar.month + 1,
          year: state.calendar.year,
        }),
      );
      return data;
    } catch (error) {
      toast.error(
        (error as AxiosError)?.message || 'Work item has not been added',
      );
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
      toast.success('Work item has been successfully deleted');
      void dispatch(
        getConsolidatedReport({
          month: calendar.month + 1,
          year: calendar.year,
        }),
      );
      return data;
    } catch (error) {
      toast.error(
        (error as AxiosError)?.message || 'Work item has not been deleted',
      );
      return rejectWithValue((error as Error).message);
    }
  },
);

export const getReportExcel = createAsyncThunk(
  'timereports/getReportExcel',
  async (__, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await api.developerProjects.getReportExcel({
        year: String(state.calendar.year),
        month: String(state.calendar.month + 1),
        id: state.timereports.selectedProject.id,
      });
      const fileName = response.headers['content-disposition'].split('"')[1];
      if (response && response?.data instanceof Blob) {
        downloadFile(response.data, fileName);
      }
    } catch (error) {
      toast.error((error as AxiosError)?.message || 'Something went wrong');
      return rejectWithValue((error as Error).message);
    }
  },
);
