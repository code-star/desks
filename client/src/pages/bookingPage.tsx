import React, { FC, useState } from "react";
import { Button, Grid } from "@mui/material";
import { TimeSetter } from "../components/TimeSetter";
import { DateSetter } from "../components/DateSetter";
import { DeskList } from "../components/DeskList";
import img1 from "../images/layout.jpg";

export const FormContext = React.createContext<any>(null);

export function getUnixTime(date: Date, time: Date) {
  return (
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    ).getTime() / 1000
  );
}

const BookingPage: FC = () => {
  const handleBooking = async () => {
    await fetch(`${process.env.REACT_APP_ROOT_URL}api/book`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        booking_id: `booking ${selectedDesk}.${Date.now()}`,
        start_time: getUnixTime(dateValue, startTimeValue),
        end_time: getUnixTime(dateValue, endtimeValue),
        booked_desk: selectedDesk,
      }),
    });
  };
  const [startTimeValue, setStartTimeValue] = useState<Date>(new Date());
  const [endtimeValue, setEndTimeValue] = useState<Date>(new Date());
  const [dateValue, setDateValue] = useState<Date>(new Date());
  const [selectedDesk, setSelectedDesk] = useState("");
  const store = {
    startTime: [startTimeValue, setStartTimeValue],
    endTime: [endtimeValue, setEndTimeValue],
    date: [dateValue, setDateValue],
    desk: [selectedDesk, setSelectedDesk],
  };
  return (
    <FormContext.Provider value={store}>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <h3>layout picture</h3>
            <img src={img1} alt="layout img" width={1200} height={500} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <DateSetter />
              </Grid>
              <Grid item xs={6}>
                <TimeSetter title={"Start time"} type={"Start"} />
                <TimeSetter title={"End time"} type={"End"} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <h3>list available desks</h3>
            <DeskList />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBooking}
            >
              Book
            </Button>
          </Grid>
        </Grid>
      </div>
    </FormContext.Provider>
  );
};
export default BookingPage;
