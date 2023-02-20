import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  deleteDeveloperProject,
  getDeveloperProjects,
  updateDeveloperProject,
} from '../asyncActions/developerProjects';
import type { DeveloperProjects } from 'api/models/developerProjects';

interface InitialState {
  data: DeveloperProjects;
  isLoading: boolean;
}

const initialState: InitialState = {
  data: [],
  isLoading: true,
};

const developerProjects = createSlice({
  name: 'developerProjects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDeveloperProjects.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getDeveloperProjects.fulfilled,
      (state, action: PayloadAction<DeveloperProjects>) => {
        state.data = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(getDeveloperProjects.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteDeveloperProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteDeveloperProject.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteDeveloperProject.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateDeveloperProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateDeveloperProject.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateDeveloperProject.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default developerProjects.reducer;
