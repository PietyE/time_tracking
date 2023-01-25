import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  addWorkItem,
  getWorkItems,
  updateWorkItem,
  deleteWorkItem,
} from '../asyncActions/timereports';
import type { WorkItem, WorkItemsResponse } from 'api/models/workItems';

interface InitialState {
  isLoading: boolean;
  totalHours: number | null;
  workItems: WorkItem[];
}

const initialState: InitialState = {
  isLoading: true,
  totalHours: null,
  workItems: [],
};

const timereports = createSlice({
  name: 'timereports',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWorkItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getWorkItems.fulfilled,
      (state, action: PayloadAction<WorkItemsResponse>) => {
        state.isLoading = false;
        state.workItems = action.payload.items;
      },
    );
    builder.addCase(getWorkItems.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(addWorkItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      addWorkItem.fulfilled,
      (state, action: PayloadAction<WorkItem>) => {
        state.isLoading = false;
        state.workItems.push(action.payload);
      },
    );
    builder.addCase(addWorkItem.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateWorkItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateWorkItem.fulfilled,
      (state, action: PayloadAction<WorkItem>) => {
        state.isLoading = false;
        state.workItems.map((workItem) =>
          workItem.id !== action.payload.id ? workItem : action.payload,
        );
      },
    );
    builder.addCase(updateWorkItem.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteWorkItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      deleteWorkItem.fulfilled,
      (state, action: PayloadAction<WorkItem>) => {
        state.isLoading = false;
        state.workItems.filter((workItem) => workItem.id !== action.payload.id);
      },
    );
    builder.addCase(deleteWorkItem.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default timereports.reducer;
