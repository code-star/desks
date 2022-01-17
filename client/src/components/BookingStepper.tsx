import {
  Stepper,
  Step,
  StepButton,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { FC, useContext } from "react";
import { TimeStep } from "../components/steps/TimeStep";
import { DateStep } from "../components/steps/DateStep";
import { DeskStep } from "../components/steps/DeskStep";
import { FormContext } from "../FormContext";
import {
  isDeskSelected,
  isEndTimeAfterStart,
  isFutureTime,
  getUnixTime,
} from "../utils";

export const BookingStepper: FC = () => {
  const stepComponents = [<DateStep />, <TimeStep />, <DeskStep />];
  const steps: string[] = [
    "Select booking date",
    "Select booking time",
    "Select desk",
  ];
  const {
    activeStep: [activeStep, setActiveStep],
    date: [dateValue],
    startTime: [startTimeValue],
    endTime: [endTimeValue],
    desk: [selectedDesk, setSelectedDesk],
    bookingSucces: [, setBookingSucces],
    prevSelectedDesk: [, setPrevSelectedDesk],
  } = useContext(FormContext);

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
        user_name: sessionStorage.getItem("activeUser"),
      }),
    });
    const json = await data.json();
    if (json.booking) {
      setBookingSucces(true);
      setPrevSelectedDesk(selectedDesk);
      setSelectedDesk("");
    }
  };

  const isBookingPossible = () => {
    return (
      isLastStep &&
      (isDeskSelected(selectedDesk) ||
        isEndTimeAfterStart(dateValue, startTimeValue, endTimeValue) ||
        isFutureTime(dateValue, startTimeValue))
    );
  };

  const isLastStep = activeStep === steps.length - 1;
  const handleStep = (step: number) => {
    setActiveStep(step);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const hasStepError = (index: number) => {
    return (
      (index === 1 && isFutureTime(dateValue, startTimeValue)) ||
      (index === 1 &&
        isEndTimeAfterStart(dateValue, startTimeValue, endTimeValue)) ||
      (index === 2 && isDeskSelected(selectedDesk))
    );
  };

  return (
    <Card
      elevation={6}
      className="basecard"
      sx={{ width: { xs: "100%", md: "900px" } }}
    >
      <CardContent
        sx={{ minHeight: { xs: "calc(100vh - 120px)", md: "580px" } }}
      >
        <Grid container spacing={5}>
          <Grid item xs={6} md={12}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepButton onClick={() => handleStep(index)}>
                    <Typography variant="body1">{label}</Typography>
                    {hasStepError(index) ? (
                      <Typography variant="caption" color="error">
                        Missing/ wrong information
                      </Typography>
                    ) : null}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item xs={12}>
            {stepComponents[activeStep]}
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {isLastStep ? (
          <Button
            variant="contained"
            onClick={handleBooking}
            disabled={isBookingPossible()}
            color="secondary"
          >
            Book
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={isBookingPossible()}
          >
            Next
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
