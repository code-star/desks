import { useState, FC } from "react";
import { Typography, Card, CardContent, TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, TimePicker } from "@mui/lab";

type Props = {
  title: string;
};
let startTimeDB = new Date();
let endTimeDB = new Date();
export function getStartTime(){
  return startTimeDB;
}
export function getEndTime(){
  return endTimeDB;
}

export const TimeSetter: FC<Props> = ({ title }) => {
  const [timeValue, setTimeValue] = useState<Date>(new Date());
  return (
    <Card>
      <CardContent>
        <Typography variant="body2">{title}</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            value={timeValue}
            onChange={(newValue) => {
              if(newValue){
                setTimeValue(newValue);
                if(title.includes("Start")) startTimeDB = newValue;
                if(title.includes("End")) endTimeDB = newValue;
              }

            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
};


