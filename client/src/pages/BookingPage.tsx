import { FC, useState } from "react";
import { Grid, Snackbar, IconButton, Fab, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TimeStep } from "../components/steps/TimeStep";
import { DateStep } from "../components/steps/DateStep";
import { DeskStep } from "../components/steps/DeskStep";
import { BookingStepper } from "../components/BookingStepper";
import img from "../images/floor_plan_Ordina_B2.jpg";
import { getUnixTime, isFutureTime, isDeskSelected, isEndTimeAfterStart} from "../utils";
import { FormContext } from "../FormContext";


const UNIX_DAY = 86400 * 1000;
const steps = [<DateStep/>, <TimeStep/>, <DeskStep/>]

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
        end_time: getUnixTime(dateValue, endTimeValue),
        booked_desk: selectedDesk,
      }),
    });
    const json = await data.json();
    if (json.booking) {
      setOpen(true);
    }
  };
  const checkFields = () => {
    return isDeskSelected(selectedDesk) || isEndTimeAfterStart(dateValue, startTimeValue, endTimeValue) || isFutureTime(dateValue, startTimeValue);
  };

  const initialStartTime = new Date();
  initialStartTime.setHours(9, 0, 0, 0);
  const initialEndTime = new Date();
  initialEndTime.setHours(17, 0, 0, 0);
  const [activeStep, setActiveStep] = useState(0);
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
              {steps[activeStep]}
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
