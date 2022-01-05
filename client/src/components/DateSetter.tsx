import { useContext, FC } from "react";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, StaticDatePicker } from "@mui/lab";
import { FormContext } from "../FormContext";
import { getUnixTime } from "../utils";

const isPastDate = (date: Date) => {
  return getUnixTime(date, date) < Date.now() / 1000;
};

export const DateSetter: FC = () => {
  const {
    date: [dateValue, setDateValue],
  } = useContext(FormContext);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker<Date>
        orientation="portrait"
        displayStaticWrapperAs="desktop"
        openTo="day"
        value={dateValue}
        shouldDisableDate={isPastDate}
        onChange={(newValue) => {
          if (newValue) {
            setDateValue(newValue);
          }
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
