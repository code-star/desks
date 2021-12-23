import { Stepper, Step, StepButton, Typography, Box, Button } from "@mui/material";
import { FC, useContext } from "react";
import { FormContext } from "../utils";

export const BookingStepper: FC = () => {
  const steps: string[] = [
    "Select booking date",
    "Select start time and end time booking",
    "Select desk",
  ];
  const {
    activeStep: [activeStep, setActiveStep],
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

  return (
    <Box>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={() => handleStep(index)}>
              <Typography variant="h5">{label}</Typography>
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
