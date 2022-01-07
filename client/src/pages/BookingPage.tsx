import { FC, useState } from "react";
import {
  Snackbar,
  IconButton,
  Fab,
  Card,
  Box,
  CardContent,
  CardActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BookingStepper } from "../components/BookingStepper";
import {
  getUnixTime,
  isFutureTime,
  isDeskSelected,
  isEndTimeAfterStart,
} from "../utils";
import { FormContext } from "../FormContext";
/* TODO issue 58 better MUI styling */
import "./BookingPage.css";

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
      setPrevSelectedDesk(selectedDesk);
      setSelectedDesk("");
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
  const [prevSelectedDesk, setPrevSelectedDesk] = useState("");
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
      <Box sx={{ p: { xs: 1, md: 3 }, pt: { xs: 3, md: 3 } }}>
        <Card
          elevation={6}
          className="bookingpage-paper"
          sx={{ width: { xs: "100%", md: "900px" } }}
        >
          <CardContent sx={{ minHeight: {xs: "calc(100vh - 120px)",md: "580px"} }}>
            <BookingStepper />
            <Fab
              className="bookingpage-fab"
              disabled={checkFields()}
              onClick={handleBooking}
            >
              Book
            </Fab>
          </CardContent>
          <CardActions>test</CardActions>
        </Card>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={bookingSucces}
          action={
            <IconButton
              onClick={() => {
                setBookingSucces(false);
              }}
            >
              <CloseIcon color={"primary"} />
            </IconButton>
          }
          autoHideDuration={6000}
          onClose={() => {
            setBookingSucces(false);
          }}
          message={`Your booking for desk ${prevSelectedDesk} was succesful`}
        />
      </Box>
    </FormContext.Provider>
  );
};
export default BookingPage;
