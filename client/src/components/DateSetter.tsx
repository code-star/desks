import { useState, FC } from "react";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, StaticDatePicker } from "@mui/lab";

let dateDB:Date;
export function getDate(){
  return dateDB;
}

export const DateSetter: FC = () => {
    const [dateValue, setDateValue] = useState<Date>(new Date());
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker<Date>
          orientation="portrait"
          openTo="day"
          value={dateValue}
          onChange={(newValue) => {
            if(newValue){
              setDateValue(newValue);
              dateDB = newValue;
            } 
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  };