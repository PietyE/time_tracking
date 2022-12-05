import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  isLoading: boolean;
}

const initialState: InitialState = {
  isLoading: true,
};

const timereports = createSlice({
  name: 'timereports',
  initialState,
  reducers: {},
});

export default timereports.reducer;
