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
    toggleDrawer: (state) => {
      state.isOpenDrawer = !state.isOpenDrawer;
    },
  },
});

export const { toggleDrawer } = mainMenuSlice.actions;

export default mainMenuSlice.reducer;
