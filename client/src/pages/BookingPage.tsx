import { FC, useState } from "react";
import { Grid, Snackbar, IconButton, Alert, Fab, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TimeSetter } from "../components/TimeSetter";
import { DateSetter } from "../components/DateSetter";
import { BookingStepper } from "../components/BookingStepper";
import { AvailableDeskList } from "../components/AvailableDeskList";
import img from "../images/floor_plan_Ordina_B2.jpg";
import { getUnixTime, FormContext } from "../utils";

const UNIX_HOUR = 3600 * 1000;
const UNIX_DAY = 86400 * 1000;

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
  const isDeskSelected =() =>{
    return selectedDesk === ""
  }
  const isEndTimeAfterStart = () =>{
    const unixStartTime = getUnixTime(dateValue, startTimeValue);
    const unixEndTime = getUnixTime(dateValue, endtimeValue);
    return unixEndTime - unixStartTime <= 0;
  }
  const isFutureTime = () =>{
    const unixStartTime = getUnixTime(dateValue, startTimeValue);
    return unixStartTime - (Date.now() + UNIX_HOUR) / 1000 <= 0;
  }

  const checkFields = () => {
    return isDeskSelected() || isEndTimeAfterStart() || isFutureTime();
  };

  const initialStartTime = new Date();
  initialStartTime.setHours(9, 0, 0, 0);
  const initialEndTime = new Date();
  initialEndTime.setHours(17, 0, 0, 0);
  const [activeStep, setActiveStep] = useState(0);
  const [startTimeValue, setStartTimeValue] = useState<Date>(initialStartTime);
  const [endtimeValue, setEndTimeValue] = useState<Date>(initialEndTime);
  const [dateValue, setDateValue] = useState<Date>(
    new Date(Date.now() + UNIX_DAY)
  );
  const [selectedDesk, setSelectedDesk] = useState("");
  const store = {
    startTime: [startTimeValue, setStartTimeValue],
    endTime: [endtimeValue, setEndTimeValue],
    date: [dateValue, setDateValue],
    desk: [selectedDesk, setSelectedDesk],
    activeStep: [activeStep, setActiveStep],
  };

  return (
    <FormContext.Provider value={store}>
      <div>
        <Grid container alignItems={"center"}>
          <Grid item sm={12} lg={7} alignItems={"center"} textAlign={"center"}>
            <Typography variant="h4">Floor plan</Typography>
            <img src={img} alt="layout img" width={"100%"} height={"auto"} />
          </Grid>
          <Grid item sm={12} lg={5} height={1100}>
            <Grid container direction={"column"} justifyContent={"center"} paddingTop={5}>
              <Grid item md={4}>
              <BookingStepper />
              </Grid>
              <Grid item md={6} justifyContent={"center"}>
              {
              {
                "0": (
                  <Box>
                    <Typography variant="subtitle1">Please select the date for when you want to book a desk</Typography>
                    <DateSetter />
                    {isFutureTime() ? (
                      <Alert severity="warning">
                        Check if the date has passed
                      </Alert>
                    ) : null}
                  </Box>
                ),
                "1": (
                  <Box>
                    <TimeSetter title={"Please select the start time for when you want to book a desk"} type={"Start"} />
                    {isFutureTime() ? (
                      <Alert severity="warning">
                        Check if the time has passed
                      </Alert>
                    ) : null}
                    <TimeSetter title={"Please select the end time for when you want to book a desk"} type={"End"} />
                    {isEndTimeAfterStart() ? (
                      <Alert severity="warning">
                        The end time is earlier than the start time
                      </Alert>
                    ) : null}
                  </Box>
                ),
                "2": (
                  <Box>
                    <Typography variant="subtitle1">Please select one of the available desks in the list below</Typography>
                    <AvailableDeskList />
                    {isDeskSelected()? (
                      <Alert severity="warning">
                        There is no desk selected
                      </Alert>
                    ) : (
                      ""
                    )}
                  </Box>
                ),
              }[activeStep]
            }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Fab
              color="secondary"
              disabled={checkFields()}
              onClick={handleBooking}
              style={{
                bottom: 20,
                right: 20,
                position: 'fixed',}}
            >
              Book
            </Fab>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={open}
          action={
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon color={"primary"} />
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
