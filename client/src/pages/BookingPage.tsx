import { FC, useState } from "react";
import { Snackbar, IconButton, Fab, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BookingStepper } from "../components/BookingStepper";
import { getUnixTime, isFutureTime, isDeskSelected, isEndTimeAfterStart } from "../utils";
import { FormContext } from "../FormContext";
import "../styles.css";

const UNIX_DAY = 86400 * 1000;

const BookingPage: FC = () => {

  const handleBooking = async () => {
    const data = await fetch(`${process.env.REACT_APP_ROOT_URL}api/book`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        booking_id: `booking ${selectedDesk}.${Date.now()}`,
        start_time: getUnixTime(dateValue, startTimeValue),
        end_time: getUnixTime(dateValue, endTimeValue),
        booked_desk: selectedDesk,
      }),
    });
    const json = await data.json();
    if (json.booking) {
      setBookingSucces(true);
    }
  };
  const checkFields = () => {
    return (
      isDeskSelected(selectedDesk) ||
      isEndTimeAfterStart(dateValue, startTimeValue, endTimeValue) ||
      isFutureTime(dateValue, startTimeValue)
    );
  };

  const initialStartTime = new Date();
  initialStartTime.setHours(9, 0, 0, 0);
  const initialEndTime = new Date();
  initialEndTime.setHours(17, 0, 0, 0);
  const [activeStep, setActiveStep] = useState(0);
  const [bookingSucces, setBookingSucces] = useState(false);
  const [startTimeValue, setStartTimeValue] = useState<Date>(initialStartTime);
  const [endTimeValue, setEndTimeValue] = useState<Date>(initialEndTime);
  const [dateValue, setDateValue] = useState<Date>(
    new Date(Date.now() + UNIX_DAY)
  );
  const [selectedDesk, setSelectedDesk] = useState("");
  const store = {
    startTime: [startTimeValue, setStartTimeValue],
    endTime: [endTimeValue, setEndTimeValue],
    date: [dateValue, setDateValue],
    desk: [selectedDesk, setSelectedDesk],
    activeStep: [activeStep, setActiveStep],
    bookingSucces: [bookingSucces, setBookingSucces],
  };

  return (
    <FormContext.Provider value={store}>
      <div style={{ textAlign: "center", padding: "1%" }}>
        <Paper
          elevation={6}
          style={{
            width: "80%",
            minWidth: 800,
            height: "auto",
            margin: "auto",
            padding: "2%",
          }}
        >
          <BookingStepper />
          <Fab
          color="secondary"
          disabled={checkFields()}
          onClick={handleBooking}
          style={{
            bottom: 20,
            right: 20,
            position: "fixed",
          }}
        >
          Book
        </Fab>
        </Paper>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={bookingSucces}
          action={
            <IconButton onClick={() => {
            setBookingSucces(false);
            setSelectedDesk("");}}>
              <CloseIcon color={"primary"} />
            </IconButton>
          }
          autoHideDuration={6000}
          onClose={() => {
            setBookingSucces(false);
            setSelectedDesk("");
          }}
          message={`Your booking for desk ${selectedDesk} was succesful`}
        />
      </div>
    </FormContext.Provider>
  );
};
export default BookingPage;
