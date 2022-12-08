import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getVilmatesUsers } from '../asyncActions/vilmates';
import type { Users } from 'api/models/users';

interface InitialState {
  isLoading: boolean;
  users: Users;
}

const initialState: InitialState = {
  isLoading: true,
  users: [],
};

const vilmatesSlice = createSlice({
  name: 'vilmates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVilmatesUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getVilmatesUsers.fulfilled,
      (state, action: PayloadAction<Users>) => {
        state.isLoading = false;
        state.users = action.payload;
      },
    );
  },
});

export default vilmatesSlice.reducer;
