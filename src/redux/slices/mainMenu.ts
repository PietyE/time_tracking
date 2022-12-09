import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  isOpenDrawer: boolean;
}

const initialState: InitialState = {
  isOpenDrawer: true,
};

const mainMenuSlice = createSlice({
  name: 'mainMenu',
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.isOpenDrawer = true;
    },
    closeDrawer: (state) => {
      state.isOpenDrawer = false;
    },
  },
});

export const { openDrawer, closeDrawer } = mainMenuSlice.actions;

export default mainMenuSlice.reducer;
