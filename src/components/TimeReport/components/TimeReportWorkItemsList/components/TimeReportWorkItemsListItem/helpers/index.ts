interface ReturnType {
  dayTitle: string;
  isWeekend: boolean;
}

export const useDays = (
  year: number,
  month: number,
  currentDayOrdinalNumber: number,
): ReturnType => {
  const currentDay = new Date(year, month, currentDayOrdinalNumber);
  const dayOrdinalNumberInWeek = currentDay.getDay();

  const isWeekend: boolean =
    dayOrdinalNumberInWeek === 0 || dayOrdinalNumberInWeek === 6;

  const dayTitle: string = currentDay
    .toLocaleDateString('en', {
      day: 'numeric',
      weekday: 'long',
    })
    .split(' ')
    .reverse()
    .join(', ');

  return {
    dayTitle,
    isWeekend,
  };
};
