import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper, { stepperClasses } from '@mui/material/Stepper';
import Step, { stepClasses } from '@mui/material/Step';
import StepLabel, { stepLabelClasses } from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, styled } from '@mui/material';
import schema from 'forms/onboarding/schema'
import uischema from 'forms/onboarding/uischema'
import Form from 'components/Form';

const steps = ['About you', 'Your organization', 'Your team'];
const stepData = [
  { title: 'About you', subtitle: 'Provide your personal information' },
  { title: 'About your organization', subtitle: 'Provide your information about your organization' },
]

const HorizontalStepperLabel = styled(StepLabel)(({ theme }) => ({
  [`& .${stepLabelClasses.label}`]: {
    fontSize: '1.12rem',
    fontWeight: '600',
    [`&.${stepLabelClasses.completed}, &.${stepLabelClasses.active}`]: {
      fontWeight: '600',
      color: theme.palette.primary.main
    }
  }
}))

const HorizontalStepper = styled(Stepper)(({ theme }) => ({
  [`&.${stepperClasses.root}`]: {
    padding: '28px', borderBottom: `1px solid ${theme.palette.secondary.main}`,
    display: 'flex',
    justifyContent: 'center',
    [`&. ${stepClasses.root}`]: {
      paddingLeft: '14px',
      paddingRight: '14px',
    }
  },
}))

const HorizontalStep = styled(Step)(({ theme }) => ({
  [`&.${stepClasses.root}`]: {
    paddingLeft: '14px',
    paddingRight: '14px',
  }
}))


export default function OnboardingWizard() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <HorizontalStepper connector={null} activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <HorizontalStep key={label} {...stepProps}>
              <HorizontalStepperLabel {...labelProps}>{label}</HorizontalStepperLabel>
            </HorizontalStep>
          );
        })}
      </HorizontalStepper>
      <Box sx={{ pl: 5, pr: 5, maxWidth: '1300px', margin: '0 auto' }}>
        <Grid container height='100px' sx={{ marginBottom: '50px', pl: '16px', mt: '40px' }}>
          <Grid lg={10} md={12} item>
            <Typography variant='h5' fontWeight={600} sx={{ marginTop: '10px' }}>{stepData[activeStep].title}</Typography>
            <Typography sx={{ marginTop: '10px' }}><span>{stepData[activeStep].subtitle}</span></Typography>
          </Grid>
        </Grid>
        <Form
          name='onboarding'
          schema={schema[activeStep]}
          uischema={uischema[activeStep]}
        />
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {isStepOptional(activeStep) && (
            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>
          )}
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
