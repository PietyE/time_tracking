import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../asyncActions/users';
import type { Users } from 'api/models/users';

interface InitialState {
  users: Users;
  isLoading: boolean;
}

const initialState: InitialState = {
  users: [],
  isLoading: true,
};

const usersSlice = createSlice({
  name: 'mainMenu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getUsers.fulfilled,
      (state, action: PayloadAction<Users>) => {
        state.isLoading = false;
        state.users = action.payload;
      },
    );
    builder.addCase(getUsers.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default usersSlice.reducer;
