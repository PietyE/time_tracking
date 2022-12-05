import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  isLoading: boolean;
}

const initialState: InitialState = {
  isLoading: true,
};

const projectReport = createSlice({
  name: 'projectReport',
  initialState,
  reducers: {},
});

export default projectReport.reducer;
