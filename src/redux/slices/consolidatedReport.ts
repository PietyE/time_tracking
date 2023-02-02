import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getConsolidatedReport } from '../asyncActions/consolidatedReport';
import type { ConsolidatedReport } from 'api/models/users';

interface InitialState {
  data: ConsolidatedReport[];
  isLoading: boolean;
}

const initialState: InitialState = {
  data: [],
  isLoading: true,
};

const consolidatedReport = createSlice({
  name: 'consolidatedReport',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getConsolidatedReport.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getConsolidatedReport.fulfilled,
      (state, action: PayloadAction<ConsolidatedReport[]>) => {
        state.data = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(getConsolidatedReport.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default consolidatedReport.reducer;
