import { useContext, FC } from "react";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, StaticDatePicker } from "@mui/lab";
import { FormContext } from "../utils";

export const DateSetter: FC = () => {
  const {
    date: [dateValue, setDateValue],
  } = useContext(FormContext);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker<Date>
        orientation="portrait"
        openTo="day"
        value={dateValue}
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
