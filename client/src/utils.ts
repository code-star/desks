export function isBetween(value: number, min: number, max: number) {
  return value >= min && value <= max;
}

export function getUnixTime(date: Date, time: Date) {
  return (
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    ).getTime() / 1000
  );
}
