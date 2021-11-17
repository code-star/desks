import React, { useState, FC } from "react";
import { Typography, Card, CardContent, TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, StaticDatePicker, TimePicker } from "@mui/lab";

type Props = {
  title: string;
};
export const TimeSetter: FC<Props> = ({ title }) => {
  const [timeValue, setTimeValue] = useState<Date | null>(null);
  return (
    <Card>
      <CardContent>
        <Typography variant="body2">{title}</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            value={timeValue}
            onChange={(newValue) => {
              setTimeValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
};

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
