import {
  Stepper,
  Step,
  StepButton,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { FC, useContext } from "react";
import { TimeStep } from "../components/steps/TimeStep";
import { DateStep } from "../components/steps/DateStep";
import { DeskStep } from "../components/steps/DeskStep";
import { FormContext } from "../FormContext";
import { isDeskSelected, isEndTimeAfterStart, isFutureTime } from "../utils";

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
    desk: [selectedDesk],
  } = useContext(FormContext);

  const handleStep = (step: number) => {
    setActiveStep(step);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleNext = () => {
    const isLastStep = activeStep === steps.length - 1;
    const newActiveStep = isLastStep ? 0 : activeStep + 1;
    setActiveStep(newActiveStep);
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
      <Grid item xs={12}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext}>Next</Button>
      </Grid>
    </Grid>
  );
};
