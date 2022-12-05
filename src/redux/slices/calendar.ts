import { createSlice } from '@reduxjs/toolkit';
import { createTypedSelector } from '../utils';

interface InitialState {
  month: number;
  year: number;
}

const todayDate: Date = new Date();

const initialState: InitialState = {
  month: todayDate.getMonth(),
  year: todayDate.getFullYear(),
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {},
});

export const getCalendarMonth = createTypedSelector<number>(
  (state) => state.calendar.month,
);

export const getCalendarYear = createTypedSelector<number>(
  (state) => state.calendar.year,
);

export default calendarSlice.reducer;
