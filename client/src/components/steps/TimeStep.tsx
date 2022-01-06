import { FC, useContext } from "react";
import { Box, Alert } from "@mui/material";
import { TimeSetter } from "../TimeSetter";
import { isFutureTime, isEndTimeAfterStart } from "../../utils";
import { FormContext } from "../../FormContext";

export const TimeStep: FC = () => {
  const {
    date: [dateValue],
    startTime: [startTimeValue],
    endTime: [endTimeValue],
  } = useContext(FormContext);

  return (
    <Box>
      <TimeSetter
        title={"Please select the start time for when you want to book a desk"}
        type={"Start"}
      />
      {isFutureTime(dateValue, startTimeValue) ? (
        <Alert severity="warning">Check if the time has passed</Alert>
      ) : null}
      <TimeSetter
        title={"Please select the end time for when you want to book a desk"}
        type={"End"}
      />
      {isEndTimeAfterStart(dateValue, startTimeValue, endTimeValue) ? (
        <Alert severity="warning">
          The end time is earlier than the start time
        </Alert>
      ) : null}
    </Box>
  );
};
