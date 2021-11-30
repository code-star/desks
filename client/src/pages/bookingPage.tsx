import React, { FC } from "react";
import { Button, Grid } from "@mui/material";
import { TimeSetter, getEndTime, getStartTime } from "../components/TimeSetter";
import { DateSetter, getDate } from "../components/DateSetter";
import { DeskList, getDesk } from "../components/DeskList";

const BookingPage: FC = () => {
  const handleBooking = async () => {
    console.log(getStartTime());
    await fetch(`${process.env.REACT_APP_ROOT_URL}api/book`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        bookingId: `booking ${getDesk()}.1`,
        startTime: new Date(
          getDate().getFullYear(),
          getDate().getMonth(),
          getDate().getDay(),
          getStartTime().getHours(),
          getStartTime().getMinutes()
        ).getTime()/1000,
        endTime: new Date(
          getDate().getFullYear(),
          getDate().getMonth(),
          getDate().getDay(),
          getEndTime().getHours(),
          getEndTime().getMinutes()
        ).getTime()/1000,
        deskId: getDesk(),
      }),
    });
  };
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
              <TimeSetter title={"End time"} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <h3>list desks</h3>
          <DeskList />
          <Button variant="contained" color="secondary" onClick={handleBooking}>
            Book
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
export default BookingPage;
