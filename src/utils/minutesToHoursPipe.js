export const minutesToHoursPipe = (minutes) => {
  if (minutes < 10) {
    return `0h 0${minutes}m`;
  }
  if (minutes < 60) {
    return `0h ${minutes}m`;
  }
  let hours = 0;
  let min = minutes;
  while (min >= 60) {
    hours++;
    min = min - 60;
  }
  const formatedMinutes = min.toString().length > 1 ? min : `0${min}`;
  return `${hours}h ${formatedMinutes}m`;
}

