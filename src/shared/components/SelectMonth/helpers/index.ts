import React, { useMemo, useState } from 'react';
import { monthsNamesLong } from 'constants/months';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getCalendarMonth, getCalendarYear } from 'redux/selectors/calendar';
import { changeSelectedDate } from 'redux/slices/calendar';

interface ReturnType {
  isOpenPicker: boolean;
  currentMonth: number;
  currentYear: number;
  longMonthNameText: string;
  disabledPrevYearButton: boolean;
  disabledNextYearButton: boolean;
  disabledPrevMonthButton: boolean;
  disabledNextMonthButton: boolean;
  handlerOpenPicker: () => void;
  handleClose: (_event?: MouseEvent | TouchEvent) => void;
  handlerSelectMonth: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handlerSelectNextMonth: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handlerSelectPrevMonth: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handlerSelectNextYear: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handlerSelectPrevYear: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isMonthDisabled: (index: number) => boolean;
}

export const useCalendar = (
  showYear: boolean,
  initialYear: number,
): ReturnType => {
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = todayDate.getMonth();
  const currentMonth = useAppSelector(getCalendarMonth);
  const currentYear = useAppSelector(getCalendarYear);
  const dispatch = useAppDispatch();
  const [isOpenPicker, setIsOpenPicker] = useState<boolean>(false);

  const handleClose = (_event?: MouseEvent | TouchEvent): void =>
    setIsOpenPicker(false);

  const handlerOpenPicker = (): void => setIsOpenPicker(!isOpenPicker);

  const handlerSelectMonth = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    const target = event.target as HTMLButtonElement;
    event.preventDefault();
    const selectedMonth = target.dataset.month;
    if (target.classList.contains('disabled')) return;
    dispatch(changeSelectedDate({ month: Number(selectedMonth) }));
    handleClose();
  };

  const handlerSelectPrevYear = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    event.preventDefault();
    if (currentYear > initialYear)
      dispatch(changeSelectedDate({ year: currentYear - 1 }));
  };

  const handlerSelectNextYear = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    event.preventDefault();
    if (currentYear < year)
      dispatch(changeSelectedDate({ year: currentYear + 1 }));
  };

  const handlerSelectPrevMonth = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    event.preventDefault();
    if (currentMonth === 0) {
      if (currentYear === initialYear) {
        return;
      }

      dispatch(changeSelectedDate({ month: 11 }));
      dispatch(changeSelectedDate({ year: currentYear - 1 }));
    } else {
      dispatch(changeSelectedDate({ month: currentMonth - 1 }));
    }
  };

  const handlerSelectNextMonth = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    event.preventDefault();
    event.stopPropagation();
    if (currentMonth === 11) {
      dispatch(changeSelectedDate({ month: 0 }));
      dispatch(changeSelectedDate({ year: currentYear + 1 }));
    } else {
      dispatch(changeSelectedDate({ month: currentMonth + 1 }));
    }
  };
  const longMonthName = monthsNamesLong[currentMonth];

  const longMonthNameText = useMemo(() => {
    if (currentYear || currentMonth) {
      if (showYear) {
        return `${longMonthName}, ${currentYear} `;
      }
      if (currentYear) {
        return `${longMonthName}, ${currentYear}`;
      }
    }
    return longMonthName;
  }, [currentYear, currentMonth, longMonthName, showYear]);

  const disabledNextYearButton = currentYear === year;
  const disabledPrevYearButton = currentYear === initialYear;
  const disabledNextMonthButton =
    currentMonth === month && disabledNextYearButton;
  const disabledPrevMonthButton = currentMonth === 0 && disabledPrevYearButton;

  const isMonthDisabled = (index: number): boolean =>
    index > month && disabledNextYearButton;

  return {
    isOpenPicker,
    currentMonth,
    currentYear,
    longMonthNameText,
    disabledPrevYearButton,
    disabledNextYearButton,
    disabledPrevMonthButton,
    disabledNextMonthButton,
    handlerOpenPicker,
    handleClose,
    handlerSelectMonth,
    handlerSelectNextMonth,
    handlerSelectPrevMonth,
    handlerSelectNextYear,
    handlerSelectPrevYear,
    isMonthDisabled,
  };
};
