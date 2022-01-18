import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { DateSetter } from "../DateSetter";

export const DateStep: FC = () => {
  return (
    <Box>
      <Typography variant="body1" gutterBottom>
        Please select the date for the booking
      </Typography>
      <DateSetter />
    </Box>
  );
};
