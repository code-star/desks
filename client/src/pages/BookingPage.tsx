import { FC, useState } from "react";
import { Snackbar, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BookingStepper } from "../components/BookingStepper";
import { FormContext } from "../FormContext";

const UNIX_DAY = 86400 * 1000;

const BookingPage: FC = () => {
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
    prevSelectedDesk: [prevSelectedDesk, setPrevSelectedDesk],
  };

  return (
    <FormContext.Provider value={store}>
      <Box sx={{ p: { xs: 1, md: 3 }, pt: { xs: 3, md: 3 } }}>
        <BookingStepper />
        <Snackbar
           anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
