import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ChangeSelectedDate } from '../types/calendar';

const todayDate: Date = new Date();

const initialState: CalendarValues = {
  month: todayDate.getMonth(),
  year: todayDate.getFullYear(),
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    changeSelectedDate: (state, action: PayloadAction<ChangeSelectedDate>) => {
      state.month = action.payload.month;
      state.year = action.payload.year;
    },
  },
});

export const { changeSelectedDate } = calendarSlice.actions;
export default calendarSlice.reducer;
