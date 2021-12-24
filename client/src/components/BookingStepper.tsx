import { Stepper, Step, StepButton, Typography, Box, Button } from "@mui/material";
import { FC, useContext } from "react";
import { FormContext } from "../FormContext";
import { isFutureTime, isDeskSelected, isEndTimeAfterStart } from "../utils";

export const BookingStepper: FC = () => {
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
    const newActiveStep =
      isLastStep
        ? 0
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const hasStepError = (index:number) =>{
    return (index === 0 && isFutureTime(dateValue, startTimeValue))
    || (index === 1 && isEndTimeAfterStart(dateValue,startTimeValue,endTimeValue))
    || (index === 2 && isDeskSelected(selectedDesk));
  }

  return (
    <Box>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={() => handleStep(index)}>
            <Typography variant="h5">{label}</Typography>
              {hasStepError(index)?
              <Typography variant="caption" color="error">Something here isnt filled in correctly</Typography>: null
              }
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box sx={{pt: 2 }}>
      <Button disabled={activeStep === 0} onClick={handleBack}>
        Back
      </Button>
      <Button onClick={handleNext}>
        Next
      </Button>
      </Box>
    </Box>
  );
};
