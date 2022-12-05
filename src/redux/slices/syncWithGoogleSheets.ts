import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  isLoading: boolean;
}

const initialState: InitialState = {
  isLoading: true,
};

const syncWithGoogleSheetsSlice = createSlice({
  name: 'syncWithGoogleSheetsSlice',
  initialState,
  reducers: {},
});

export default syncWithGoogleSheetsSlice.reducer;
