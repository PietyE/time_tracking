import get from 'lodash/get';

export const getDaysInMonth = (date: Date): number =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

export const formatTimeToMinutes = (timeStr: string): number => {
  const [_hour, min] = timeStr?.split(':') ?? ['0:00'];
  return _hour ? Number(_hour) * 60 + Number(min) : Number(min);
};

export const parseMinToHoursAndMin = (min: number, Hformat = false): string => {
  const HOUR = 60;
  const minToNumber = min;
  let strHours: string = '0';
  let strMin: string = '00';

  if (minToNumber < HOUR) {
    strMin = minToNumber < 10 ? `0${minToNumber}` : `${minToNumber}`;
  } else {
    const hours = Math.floor(minToNumber / HOUR);
    strHours = `${hours}`;
    const minutes = minToNumber % HOUR;
    strMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
  }

  return Hformat ? `${strHours}h ${strMin}m` : `${strHours}:${strMin}`;
};

export const getTotalHoursOfProject = <T>(
  items: T[],
  keysToDuration: string[],
  Hformat = true,
): string =>
  items.length
    ? parseMinToHoursAndMin(
        items.reduce(
          (accumulator, nexValue) =>
            accumulator + Number(get(nexValue, keysToDuration)),
          0,
        ),
        Hformat,
      )
    : '0h 00m';
