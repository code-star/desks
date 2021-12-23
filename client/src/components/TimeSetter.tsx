import { FC, useContext } from "react";
import { Typography, Box, TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, TimePicker } from "@mui/lab";
import { FormContext } from "../utils";

type Props = {
  title: string;
  type: "Start" | "End";
};

export const TimeSetter: FC<Props> = ({ title, type }) => {
  const {
    startTime: [startTimeValue, setStartTimeValue],
  } = useContext(FormContext);
  const {
    endTime: [endTimeValue, setEndTimeValue],
  } = useContext(FormContext);
  return (
    <Box>
        <Typography variant="subtitle1">{title}</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            value={type === "Start" ? startTimeValue : endTimeValue}
            onChange={(newValue) => {
              if (!newValue) {
                return;
              }
              if (type === "Start") {
                setStartTimeValue(newValue);
              }
              if (type === "End") {
                setEndTimeValue(newValue);
              }
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
    </Box>
  );
};
