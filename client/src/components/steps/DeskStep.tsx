import { FC, useContext, useState } from "react";
import { Typography, Alert, Grid, Modal } from "@mui/material";
import { AvailableDeskList } from "../AvailableDeskList";
import { isDeskSelected } from "../../utils";
import { FormContext } from "../../FormContext";
import img from "../../images/floor_plan_Ordina_B2.jpg";
import "./DeskStep.css";

export const DeskStep: FC = () => {
  const [imgOpen, setImgOpen] = useState(false);
  const {
    desk: [selectedDesk],
  } = useContext(FormContext);

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="body1" gutterBottom>
            Please select one of the available desks:
          </Typography>
          <AvailableDeskList />
          {isDeskSelected(selectedDesk) ? (
            <Alert severity="warning">There is no desk selected</Alert>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12} md={8}>
          <img
            className="deskstep-image"
            onClick={() => setImgOpen(true)}
            src={img}
            alt="Layout"
          />
          <Typography variant="caption">Click image to enlarge</Typography>
        </Grid>
      </Grid>
      <Modal open={imgOpen} onClose={() => setImgOpen(false)}>
        <img className="deskstep-modal-content" alt="zoomedLayout" src={img} />
      </Modal>
    </div>
  );
};
