import { createSlice } from '@reduxjs/toolkit';
import { createTypedSelector } from '../utils';
import type { Users } from 'api/models/users';

interface InitialState {
  isLoading: boolean;
  users: Users[];
}

const initialState: InitialState = {
  isLoading: true,
  users: [],
};

const vilmatesSlice = createSlice({
  name: 'vilmates',
  initialState,
  reducers: {},
});

export const getIsLoadingVilmatePage = createTypedSelector<boolean>(
  (state) => state.vilmates.isLoading,
);

export const getVilmateUseres = createTypedSelector<Users[]>(
  (state) => state.vilmates.users,
);

export default vilmatesSlice.reducer;
