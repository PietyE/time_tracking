import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  isLoading: boolean;
}

const initialState: InitialState = {
  isLoading: true,
};

const projectManagements = createSlice({
  name: 'projectManagements',
  initialState,
  reducers: {},
});

export default projectManagements.reducer;
