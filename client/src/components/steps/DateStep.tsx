import { FC, useContext } from "react";
import { Box, Typography, Alert } from "@mui/material";
import { DateSetter } from "../DateSetter";
import { isFutureTime } from "../../utils";
import { FormContext } from "../../FormContext";

export const DateStep: FC = () => {
  const {
    date: [dateValue],
    startTime: [startTimeValue],
  } = useContext(FormContext);

  return (
    <Box>
      <Typography className="subText">
        Please select the date for when you want to book a desk
      </Typography>
      <DateSetter />
      {isFutureTime(dateValue, startTimeValue) ? (
        <Alert severity="warning">Check if the date has passed</Alert>
      ) : null}
    </Box>
  );
};
