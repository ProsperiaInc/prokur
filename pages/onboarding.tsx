import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper, { stepperClasses } from '@mui/material/Stepper';
import Step, { stepClasses } from '@mui/material/Step';
import StepLabel, { stepLabelClasses } from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, StepConnector, stepConnectorClasses, styled } from '@mui/material';
import schema from 'forms/onboarding/schema'
import uischema from 'forms/onboarding/uischema'
import Form from 'components/Form';
import Dashboard from './dashboard_wrapper';
import { MdCheck } from 'react-icons/md'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDispatch, useSelector } from 'react-redux';
import { selectForm, setForm } from 'store/features/forms/formsSlice';

const steps = ['Your organization', 'Your team'];
const stepData = [
  { title: 'About your organization', subtitle: 'Provide your information about your organization' },
  { title: 'About your team', subtitle: 'Invite team members to join your organization' },
]

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }),
);

const DotRoot = styled(Box)(
  ({ theme, ownerState }: any) => ({
    '& .Dot-completedIcon': {
      borderRadius: '50%',
      width: 20,
      height: 20,
      borderWidth: 5,
      borderStyle: 'solid',
      borderColor: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.main,
    },
    '& .Dot-circle': {
      borderRadius: '50%',
      width: 20,
      height: 20,
      borderWidth: 5,
      borderStyle: 'solid',
      borderColor: theme.palette.secondary.main,
      backgroundColor: theme.palette.secondary.main,
      ...(ownerState?.active && {
        backgroundColor: theme.palette.primary.main,
      }),
    },
}))

export const Dot = (props: any) => {
  const { active, completed, className } = props;

  return (
    <DotRoot ownerState={{ active }} className={className}>
      {completed ? (
        <div className="Dot-completedIcon" />
      ) : (
        <div className="Dot-circle" />
      )}
    </DotRoot>
  );
}

function QontoStepIcon(props: any) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <MdCheck className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}


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

const HorizontalStepper = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.secondary.main}`,
  paddingBottom: '15px'
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

  const [initialData, setInitialData] = React.useState<any>({
    publicURL: 'elitetechnology.prokur.com/'
  })
  const dispatch = useDispatch()

  const { data: formData, ...formRest } = useSelector(selectForm('onboarding'))

  return (
    <Dashboard noDrawer noPadding>
      <Box sx={{ width: '100%' }}>
        <HorizontalStepper>
          <Stepper sx={{ margin: '65px auto 0 auto', maxWidth: '350px' }} alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label}>
                  <HorizontalStepperLabel StepIconComponent={Dot}>{label}</HorizontalStepperLabel>
                </Step>
              )
            })}
          </Stepper>
        </HorizontalStepper>
        <Box sx={{ pl: 5, pr: 5, maxWidth: '1300px', margin: '0 auto' }}>
          <Grid container height='100px' sx={{ marginBottom: '50px', pl: '16px', mt: '40px' }}>
            <Grid lg={4} md={12} item></Grid>
            <Grid lg={8} md={12} item>
              <Typography variant='h5' fontWeight={600} sx={{ marginTop: '10px' }}>{stepData[activeStep].title}</Typography>
              <Typography variant='body2' sx={{ color: 'rgba(0, 0, 0, 0.6)', marginTop: '10px' }}><span>{stepData[activeStep].subtitle}</span></Typography>
            </Grid>
          </Grid>
          <Form
            initialData={initialData}
            name='onboarding'
            schema={schema[activeStep]}
            uischema={uischema[activeStep]}
          />
          {activeStep === 1 && (
            <Button 
              onClick={() => {
                console.warn({ op: "here" });
                
                dispatch(setForm({
                  onboarding: {
                    ...formRest,
                    data: {
                      ...formData,
                      email: undefined,
                      role: undefined,
                      members: [
                        ...(formData.members || []),
                        {
                          email: formData.email,
                          role: formData.role,
                        }
                      ]
                    },
                  }
                }))
              }} 
              variant="contained"
              color="primary"
            >
              Add member
            </Button>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button
              color="primary"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}
            <Button 
              onClick={handleNext} 
              variant="contained"
              color="primary"
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Dashboard>
  );
}

export const getStaticProps = async ({ locale } : { locale: 'en' | 'es' }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  }
})
