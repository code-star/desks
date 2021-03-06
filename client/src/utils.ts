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

export const isFutureTime = (dateValue:Date, startTimeValue:Date) =>{
  const unixStartTime = getUnixTime(dateValue, startTimeValue);
  return unixStartTime - (Date.now() / 1000) <= 0;
}
export const isDeskSelected =(selectedDesk:string) =>{
  return selectedDesk === ""
}
export const isEndTimeAfterStart = (dateValue:Date, startTimeValue:Date, endtimeValue:Date) =>{
  const unixStartTime = getUnixTime(dateValue, startTimeValue);
  const unixEndTime = getUnixTime(dateValue, endtimeValue);
  return unixEndTime - unixStartTime <= 0;
}

export const getDateFromNumber = (time: number | undefined) => {
  if (time) {
    const date = new Date(time * 1000);
    return date.toLocaleString();
  }
  return "no time found";
};

