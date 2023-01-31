import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const todayDate: Date = new Date();

const initialState: CalendarValues = {
  month: todayDate.getMonth(),
  year: todayDate.getFullYear(),
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    changeSelectedDate: (
      state,
      action: PayloadAction<Partial<CalendarValues>>,
    ) => ({ ...state, ...action.payload }),
  },
});

export const { changeSelectedDate } = calendarSlice.actions;
export default calendarSlice.reducer;
