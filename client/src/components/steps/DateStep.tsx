import { FC} from "react";
import { Box, Typography} from "@mui/material";
import { DateSetter } from "../DateSetter";

export const DateStep: FC = () => {
  return (
    <Box>
      <Typography className="subText">
        Please select the date for when you want to book a desk
      </Typography>
      <DateSetter />
    </Box>
  );
};
