import React, { useRef, memo } from 'react';
import { ArrowBackIos, ArrowLeft, CalendarMonth } from '@mui/icons-material';
import {
  Box,
  ClickAwayListener,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useCalendar } from './helpers';
import { monthsNamesShort } from 'constants/months';
import { styles as muiStyles } from './styles';
import styles from './SelectMonth.module.scss';

interface Props {
  initialYear: number;
}

const SelectMonth: React.FC<Props & { showYear?: never }> = ({
  showYear = true,
  initialYear = 2013,
}): JSX.Element => {
  const {
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
  } = useCalendar(showYear, initialYear);

  const selectMonthRef = useRef<HTMLElement | null>(null);
  const getClassNameForMonth = (index: number): string => {
    const className = styles.day_button;
    if (isMonthDisabled(index)) {
      return `${className} ${styles.disabled}`;
    }
    if (currentMonth === index && currentYear) {
      return `${className} ${styles.active}`;
    }
    return className;
  };

  const borderColor: string = isOpenPicker ? 'primary.main' : 'text.disabled';

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='stretch'
        minWidth={248}
        height={42}
        border={1}
        borderColor={borderColor}
        borderRadius={1}
        bgcolor='common.white'
        position='relative'
        boxShadow={isOpenPicker ? 1 : 0}
        ref={selectMonthRef}
      >
        <IconButton
          onClick={handlerSelectPrevMonth}
          disabled={disabledPrevMonthButton}
          sx={muiStyles.leftButton}
        >
          <ArrowBackIos viewBox='-5 0 24 24' />
        </IconButton>
        <Box
          onClick={handlerOpenPicker}
          display='flex'
          justifyContent='center'
          alignItems='center'
          flex={1}
          sx={muiStyles.yearContainer}
        >
          <CalendarMonth color='disabled' />
          <Typography
            component='span'
            variant='body2'
            color='secondary.contrastText'
          >
            {longMonthNameText}
          </Typography>
        </Box>
        <IconButton
          disabled={disabledNextMonthButton}
          onClick={handlerSelectNextMonth}
          sx={muiStyles.rightButton}
        >
          <ArrowBackIos viewBox='-5 0 24 24' />
        </IconButton>
        {isOpenPicker && (
          <Stack
            width={1}
            position='absolute'
            top='110%'
            bgcolor='common.white'
            boxShadow={1}
            borderRadius={1}
            zIndex='tooltip'
            overflow='hidden'
            border={1}
            borderColor={borderColor}
          >
            <Box
              width={1}
              display='flex'
              justifyContent='center'
              alignItems='stretch'
              mb={10}
              borderBottom={1}
              borderColor={borderColor}
            >
              <IconButton
                disabled={disabledPrevYearButton}
                onClick={handlerSelectPrevYear}
                sx={{ ...muiStyles.leftButton, py: 0 }}
              >
                <ArrowLeft />
              </IconButton>
              <Typography
                component='span'
                display='flex'
                justifyContent='center'
                alignItems='center'
                flex={1}
              >
                {currentYear}
              </Typography>
              <IconButton
                disabled={disabledNextYearButton}
                onClick={handlerSelectNextYear}
                sx={{ ...muiStyles.rightButton, py: 0 }}
              >
                <ArrowLeft />
              </IconButton>
            </Box>
            <Box
              height='auto'
              display='flex'
              flexWrap='wrap'
              justifyContent='space-around'
            >
              {monthsNamesShort.map((item, index) => (
                <button
                  key={item}
                  disabled={isMonthDisabled(index)}
                  className={getClassNameForMonth(index)}
                  data-month={index}
                  onClick={handlerSelectMonth}
                >
                  {item}
                </button>
              ))}
            </Box>
          </Stack>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export const SelectMonthMemoized = memo(SelectMonth);
