import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api';
import type {
  ConsolidatedReport,
  ConsolidatedReportPathQueryParams,
} from 'api/models/users';
import type { RootState } from '../store';

export const getConsolidatedReport = createAsyncThunk<
  ConsolidatedReport[],
  ConsolidatedReportPathQueryParams
>(
  'consolidatedReport/getConsolidatedReport',
  async (params, { rejectWithValue, getState }) => {
    try {
      // Check after request do we select project or developer to make request based on these filters , can be improved in future
      const { projectReport } = getState() as RootState;
      console.log(projectReport);
      if (
        projectReport.selectedDeveloper.id &&
        projectReport.selectedDeveloper.id !== 'Select All'
      ) {
        const { data } = await api.users.getConsolidatedReport({
          ...params,
          search: projectReport.selectedDeveloper.email,
        });
        return data;
      }
      if (
        projectReport.selectedProject.id &&
        projectReport.selectedProject.id !== 'Select All'
      ) {
        const { data } = await api.users.getConsolidatedReport({
          ...params,
          project_id: projectReport.selectedProject.id,
        });
        return data;
      }
      const { data } = await api.users.getConsolidatedReport(params);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
