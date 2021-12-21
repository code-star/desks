import { FC, useState } from "react";
import { Button, Grid, Snackbar, IconButton, Alert } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { TimeSetter } from "../components/TimeSetter";
import { DateSetter } from "../components/DateSetter";
import { AvailableDeskList } from "../components/AvailableDeskList";
import img from "../images/plattegrond_ordinaB2.jpg";
import { getUnixTime, FormContext } from "../utils";

const UNIX_HOUR = 3600*1000;
const UNIX_DAY = 86400*1000

const BookingPage: FC = () => {
  const [open, setOpen] = useState(false);

  const handleBooking = async () => {
    const data = await fetch(`${process.env.REACT_APP_ROOT_URL}api/book`, {
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
    const json = await data.json();
    if (json.booking) {
      setOpen(true);
    }
  };
  const checkFields = () =>{
    const unixStartTime = getUnixTime(dateValue, startTimeValue);
    const unixEndTime = getUnixTime(dateValue, endtimeValue);

    const isDeskSelected = selectedDesk === "";
    const isTimeRight = unixEndTime-unixStartTime <= 0;
    const isFutureTime = unixStartTime-((Date.now()+(UNIX_HOUR))/1000) <= 0;
    return isDeskSelected || isTimeRight || isFutureTime
  };

  const initialStartTime = new Date();
  initialStartTime.setHours(9,0,0,0);
  const initialEndTime = new Date();
  initialEndTime.setHours(17,0,0,0);
  const [startTimeValue, setStartTimeValue] = useState<Date>(initialStartTime);
  const [endtimeValue, setEndTimeValue] = useState<Date>(initialEndTime);
  const [dateValue, setDateValue] = useState<Date>(new Date(Date.now()+UNIX_DAY));
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
          <Grid item sm={12} lg={8}>
            <h3>layout picture</h3>
            <img src={img} alt="layout img" width={"100%"} height={"auto"} />
            <Grid container spacing={2}>
              <Grid item md={6}>
                <DateSetter />
              </Grid>
              <Grid item md={6}>
                <TimeSetter title={"Start time"} type={"Start"} />
                {getUnixTime(dateValue, startTimeValue)-((Date.now()+(UNIX_HOUR))/1000) <= 0?<Alert severity="warning">The start time is incorrect</Alert>:""}
                <TimeSetter title={"End time"} type={"End"} />
                {getUnixTime(dateValue, startTimeValue)-((Date.now()+(UNIX_HOUR))/1000) <= 0?<Alert severity="warning">The end time is incorrect</Alert>:""}
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} lg={4}>
            <h3>list available desks</h3>
            <AvailableDeskList />
            {selectedDesk === ""?<Alert severity="warning">There is no desk selected</Alert>:""}
            <Button
              variant="contained"
              color="secondary"
              disabled={checkFields()}
              onClick={handleBooking}
            >
              Book
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={open}
          action={
            <IconButton
            onClick={()=> setOpen(false)}>
              <CloseIcon color={"primary"}/>
            </IconButton>
          }
          autoHideDuration={6000}
          onClose={() => {
            setOpen(false);
          }}
          message={`Your booking for desk ${selectedDesk} was succesful`}
        />
      </div>
    </FormContext.Provider>
  );
};
export default BookingPage;
