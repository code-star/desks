import React, { FC } from "react";
import { Grid } from "@mui/material";
import {TimeSetter} from "../components/TimeSetter";
import {DateSetter} from "../components/DateSetter";
import {DeskList} from "../components/DeskList"

const BookingPage: FC = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h3>layout picture</h3>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DateSetter />
            </Grid>
            <Grid item xs={6}>
              <TimeSetter title={"Start time"} />
              <TimeSetter title={"End Time"} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <h3>list desks</h3>
          <DeskList/>
        </Grid>
      </Grid>
    </div>
  );
};
export default BookingPage;
