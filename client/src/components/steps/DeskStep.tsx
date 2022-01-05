import { FC, useContext, useState } from "react";
import { Typography, Alert, Card, Grid } from "@mui/material";
import { AvailableDeskList } from "../AvailableDeskList";
import { isDeskSelected } from "../../utils";
import { FormContext } from "../../FormContext";
import img from "../../images/floor_plan_Ordina_B2.jpg";

export const DeskStep: FC = () => {
  const [imgOpen, setImgOpen] = useState(false);
  const {
    desk: [selectedDesk],
  } = useContext(FormContext);

  return (
      <Grid container>
        <Grid item xs={4}>
        <Typography className="subText">
        Please select one of the available desks:
      </Typography>
          <AvailableDeskList />
          {isDeskSelected(selectedDesk) ? (
            <Alert severity="warning">There is no desk selected</Alert>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={8}>
          <Card>
            <img 
              className= "image"
              onClick={() => setImgOpen(true)}
              src={img}
              alt="Layout"
            />
          </Card>
          {imgOpen ? (
            <div className="modal">
              <span className="close" onClick={() => setImgOpen(false)}>
                &times;
              </span>

              <img className="modal-content" alt="zoomedLayout" src={img} />
            </div>
          ) : null}
          <Typography variant="subtitle2">Click image to enlarge</Typography>
        
        </Grid>
      </Grid>
  );
};
