import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  isLoading: boolean;
  totalHours: number | null;
}

const initialState: InitialState = {
  isLoading: true,
  totalHours: null,
};

const timereports = createSlice({
  name: 'timereports',
  initialState,
  reducers: {},
});

export default timereports.reducer;
