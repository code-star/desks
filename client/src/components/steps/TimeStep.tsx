import { FC, useContext } from "react";
import { Stack, Alert, Divider, Typography } from "@mui/material";
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
    <Stack spacing={2}>
      <TimeSetter
        title={"Please select the start time for the booking"}
        type={"Start"}
      />
      {isFutureTime(dateValue, startTimeValue) ? (
        <Alert severity="warning">Check if the time has passed</Alert>
      ) : null}
      <Divider/>
      <TimeSetter
        title={"Please select the end time for the booking"}
        type={"End"}
      />
      {isEndTimeAfterStart(dateValue, startTimeValue, endTimeValue) ? (
        <Alert severity="warning">
          The end time is earlier than the start time
        </Alert>
      ) : null}
    </Stack>
  );
};
