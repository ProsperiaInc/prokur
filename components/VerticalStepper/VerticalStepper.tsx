import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Grid, Stepper, useMediaQuery } from '@mui/material';
import { VerticalStepperLabel, VerticalStepperConnector, VerticalStep, TopBottomConnector, VerticalStepperButton, Dot } from './VerticalStepper.styles'

export const VerticalStepper = ({ children, steps, onSubmit }: any) => {
  const [activeStep, setActiveStep] = useState(0)
  const theme = useTheme()
  const matches = useMediaQuery(`(max-width:${theme.breakpoints.values.md}px)`)
  const handleNext = async () => {
    if(activeStep === steps.length - 2) onSubmit && onSubmit()
    if(activeStep < steps.length - 1) setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  return (
    <Grid container sx={{ padding: { xs: '0', sm: '25px' }}}>
      <Grid item md={2} xs={12}>
        <TopBottomConnector active />
        <Stepper
          activeStep={activeStep}
          orientation={matches ? 'horizontal' : 'vertical'}
          connector={<VerticalStepperConnector />}
          alternativeLabel={matches}
        >
          {steps.map((step: any, index: any) => {
            return (
              <VerticalStep key={step.label} active={activeStep >= index}>
                <VerticalStepperLabel
                  sx={{ padding: '0', flexDirection: 'row-reverse', textAlign: { md: 'right', xs: 'left' }}}
                  StepIconComponent={Dot}
                  active={activeStep >= index}
                  optional={
                    <Typography variant="caption">
                      {step.optional}
                    </Typography>
                  }
                >
                  {step.label}
                </VerticalStepperLabel>
              </VerticalStep>
            )
          })}
        </Stepper>
        <TopBottomConnector active={activeStep === steps.length - 1} />
      </Grid>
      <Grid item container md={10} xs={12} pl={{ md: 17 }} pr={{ md: 10 }} pt={{ md: '0', xs: 4 }}>
        {children(activeStep)}
        <Grid container justifyContent='space-between'>
          <Grid container item md={6} xs={12} alignItems='flex-start' justifyContent='flex-start'>
            <VerticalStepperButton
              disabled={activeStep === 0}
              onClick={handleBack}
              variant='outlined'
              fullWidth={matches}
              sx={{ margin: '10px 0' }}
            >
              Back
            </VerticalStepperButton>
          </Grid>
          <Grid item container md={6} xs={12} justifyContent={{ xs: 'flex-start', md: 'flex-end' }} flexDirection={{ xs: 'column-reverse', md: 'row' }}>
            <Button onClick={handleBack} fullWidth={matches} sx={{ margin: '10px' }}>Save draft</Button>
            <VerticalStepperButton
              mt={3}
              variant="contained"
              onClick={handleNext}
              fullWidth={matches}
              sx={{ margin: '10px 0' }}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
            </VerticalStepperButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}