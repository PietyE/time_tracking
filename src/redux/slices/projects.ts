import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getProjects } from '../asyncActions/projects';
import type { Projects } from 'api/models/projects';

interface InitialState {
  data: Projects;
  isLoading: boolean;
}

const initialState: InitialState = {
  data: [],
  isLoading: true,
};

const projects = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjects.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getProjects.fulfilled,
      (state, action: PayloadAction<Projects>) => {
        state.data = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(getProjects.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default projects.reducer;
