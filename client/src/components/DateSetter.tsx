import { useState, FC } from "react";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, StaticDatePicker } from "@mui/lab";

export const DateSetter: FC = () => {
    const [dateValue, setDateValue] = useState<Date | null>(new Date());
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker<Date>
          orientation="portrait"
          openTo="day"
          value={dateValue}
          onChange={(newValue) => {
            setDateValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  };