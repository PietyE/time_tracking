import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api';
import type {
  ConsolidatedReport,
  ConsolidatedReportPathQueryParams,
} from 'api/models/users';

export const getConsolidatedReport = createAsyncThunk<
  ConsolidatedReport[],
  ConsolidatedReportPathQueryParams
>(
  'consolidatedReport/getConsolidatedReport',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await api.users.getConsolidatedReport(params);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
