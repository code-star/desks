import { FC, useContext } from "react";
import { Box, Typography, Alert } from "@mui/material";
import { AvailableDeskList } from "../AvailableDeskList";
import { isDeskSelected } from "../../utils";
import { FormContext } from "../../FormContext";

export const DeskStep: FC = () => {
  const {
    desk: [selectedDesk],
  } = useContext(FormContext);

  return (
    <Box>
      <Typography className="subText">
        Please select one of the available desks:
      </Typography>
      <AvailableDeskList />
      {isDeskSelected(selectedDesk) ? (
        <Alert severity="warning">There is no desk selected</Alert>
      ) : (
        ""
      )}
    </Box>
  );
};
