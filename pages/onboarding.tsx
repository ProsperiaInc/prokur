import React, { useState, useEffect, KeyboardEvent } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel, { stepLabelClasses } from '@mui/material/StepLabel';
import { cardHeaderClasses } from '@mui/material/CardHeader'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import schema from 'forms/onboarding/schema'
import uischema from 'forms/onboarding/uischema'
import Form from 'components/Form';
import Dashboard from './dashboard_wrapper';
import { MdDelete, MdKeyboardArrowDown } from 'react-icons/md'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateCompanyMutation, useUploadCompanyImageMutation } from 'services/company';
import { 
  Alert,
  AlertTitle,
  Avatar,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  StepConnector,
  stepConnectorClasses,
  styled,
  TextField
} from '@mui/material';
import { useInviteMutation } from 'services/user';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import { selectUser } from 'store/features/auth/authSlice';
import { selectForm, setForm as setOnboardingForm } from 'store/features/forms/formsSlice'

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  [`& .${cardHeaderClasses.action}`]: {
    alignSelf: 'center'
  }
}))

const steps = ['Your organization', 'Your team'];
const stepData = [
  { title: 'About your organization', subtitle: 'Provide your information about your organization' },
  { title: 'About your team', subtitle: 'Invite team members to join your organization' },
]

const HorizontalStepperConnector = styled(StepConnector)(({ theme }) => ({
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

export default function OnboardingWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped] = useState(new Set());
  const [form, setForm] = useState({});
  const dispatch = useDispatch()
  const router = useRouter()
  const [members, setMembers] = useState<any>([]);
  const [createCompany, { isLoading: isCompanySaveLoading, data: companySaveData, error: companySaveError }] = useCreateCompanyMutation()
  const [uploadLogo, { isLoading: isUploadLogoLoading, data: uploadLogoData, error: uploadLogoError }] = useUploadCompanyImageMutation()
  const [invite, { isLoading: isInviteLoading, data: inviteData, error: inviteError }] = useInviteMutation()
  const { data: formData, errors = [], ...rest } = useSelector(selectForm('onboarding'))
  const isDisabled = !formData || !!errors.length || isUploadLogoLoading || isCompanySaveLoading || isInviteLoading
  const isStepSkipped = (step: number) => skipped.has(step);
  // const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1) };
  const handleNext = () => { 
    if(activeStep === 0) createCompany(formData)
    if(activeStep === 1) {
      if(!members.length) router.push('/')
      members.forEach((member: any) => {
        invite({
          email: member.email,
          role: member?.role?.toLowerCase()
        })
      })
    }
  };
  const onKeyPressed = (e: KeyboardEvent<HTMLDivElement>) => e.code === 'Enter' && handleNext()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const onChange = (e: React.SyntheticEvent) => setForm({ ...form, [e.target?.name]: e.target?.value })
  const onAddMember = () => setMembers([...members, form])
  const onMemberDelete = (index: number) => {
    const membersCopy = [...members]
    membersCopy.splice(index, 1)
    setMembers(membersCopy)
  }
  const handleClose = (ev: any, role: any, index: any) => {
    setAnchorEl(null);
    if(role && index !== undefined) {
      members[index] = { ...members[index], role }
      setMembers(members)
    }
  }

  useEffect(() => {
    if(formData?.slug) {
      dispatch(
        setOnboardingForm({
          onboarding: {
            errors,
            ...rest,
            data: {
              ...(formData || {}),
              publicURL: formData?.slug ? `${formData?.slug}.prokur.com/` : '',
            },
          }
        }
      ))
    }
  }, [formData?.slug])

  useEffect(() => {
    if(
      activeStep === 0 &&
      !isCompanySaveLoading &&
      companySaveData
    ) {
      if(
        formData?.fileMediaUpload &&
        formData?.fileMediaUpload.length
      ) {
        uploadLogo(formData)
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      }
    }
  }, [isCompanySaveLoading, companySaveData, companySaveError])

  useEffect(() => {
    if(
      activeStep === 0 &&
      !isUploadLogoLoading &&
      uploadLogoData
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }, [isUploadLogoLoading, uploadLogoData, uploadLogoError])

  useEffect(() => {
    if(!inviteError && inviteData && !isInviteLoading) {
      router.push('/')
    }
  }, [inviteError, inviteData, isInviteLoading])

  return (
    <Dashboard noDrawer noPadding noLink>
      <Box sx={{ width: '100%', marginBottom: '20px' }}>
        <HorizontalStepper>
          <Stepper sx={{ margin: '65px auto 0 auto', maxWidth: '350px' }} alternativeLabel activeStep={activeStep} connector={<HorizontalStepperConnector />}>
            {steps.map((label, index) => {
              const stepProps = {};
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
        <Box
          sx={{
            p: { xs: 2, lg: 5 },
            maxWidth: '1300px',
            margin: '0 auto'
          }}
          tabIndex={0}
          onKeyDown={onKeyPressed}
        >
          <Grid container height='100px'>
            <Grid lg={4} md={12} item></Grid>
            <Grid lg={8} md={12} item sx={{ pl: '16px' }}>
              <Typography variant='h5' fontWeight={600} sx={{ marginTop: '10px' }}>{stepData[activeStep].title}</Typography>
              <Typography variant='body2' sx={{ color: 'rgba(0, 0, 0, 0.6)', marginTop: '10px' }}><span>{stepData[activeStep].subtitle}</span></Typography>
            </Grid>
          </Grid>
          {activeStep === 0 && (
            <Form
              name='onboarding'
              schema={schema}
              uischema={uischema}
            />
          )}
          {activeStep === 1 && (
            <>
              <Grid container>
                <Grid item xs={12} lg={4} sx={{ marginBottom: { xs: '16px', lg: '0' } }}>
                  <Typography variant='h5' fontWeight={600} sx={{ marginTop: '10px' }}>Add new members</Typography>
                </Grid>
                <Grid container item xs={12} lg={8}>
                  <Grid container item spacing={2}>
                    <Grid item xs={6}>
                      <FormControl fullWidth onChange={onChange}>
                        <TextField value={form?.first_name} id="outlined-basic" name='first_name' label="First name" variant="outlined" />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth onChange={onChange}>
                        <TextField value={form?.last_name} id="outlined-basic" name='last_name' label="Last name" variant="outlined" />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container item spacing={2}>
                    <Grid item xs={6}>
                      <FormControl fullWidth onChange={onChange}>
                        <TextField value={form?.email} id="outlined-basic" name='email' label="Email Address" variant="outlined" />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Select name='role' label="Role" onChange={onChange}>
                          <MenuItem value='admin'>Admin</MenuItem>
                          <MenuItem value='user'>User</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent='flex-end'>
                    <Button onClick={onAddMember} variant='outlined'>Add member</Button>
                  </Grid>
                  <Grid container item sx={{ margin: '20px 0' }}>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} lg={4} sx={{ marginBottom: { xs: '16px', lg: '0' } }}>
                  <Typography variant='h5' fontWeight={600} sx={{ marginTop: '10px' }}>Current members</Typography>
                </Grid>
                <Grid container item xs={12} lg={8} sx={{ marginBottom: { xs: '16px', lg: '0' } }}>
                  <Grid item xs={2}><Typography sx={{ color: '#4F4F4F', fontWeight: '100', textAlign: { xs: 'center', lg: 'left' } }}>Name</Typography></Grid>
                  <Grid item xs={6} />
                  <Grid item xs={2}><Typography sx={{ color: '#4F4F4F', textAlign: { xs: 'center', lg: 'left' } }}>Role</Typography></Grid>
                  <Grid item xs={2}><Typography sx={{ color: '#4F4F4F', textAlign: { xs: 'center', lg: 'left' } }}>Remove</Typography></Grid>
                </Grid>
                {members.map((member: any, idx: any) => {
                  return (
                    <Grid key={`${idx}`} container sx={{ marginBottom: '10px' }}>
                      <Grid item xs={12} lg={4} />
                      <Grid container item xs={10} lg={6}>
                        <Card elevation={0} variant='outlined' sx={{ width: '100%' }}>
                          <StyledCardHeader
                            avatar={<Avatar aria-label="recipe">{member?.first_name?.[0]}</Avatar>}
                            action={
                              <>
                                <Box
                                  id="demo-customized-button"
                                  aria-controls={open ? 'demo-customized-menu' : undefined}
                                  aria-haspopup="true"
                                  aria-expanded={open ? 'true' : undefined}
                                  variant="contained"
                                  disableElevation
                                  onClick={handleClick}
                                  sx={{
                                    cursor: 'pointer',
                                    color: '#4f4f4f',
                                    fontWeight: 300,
                                    marginRight: '10px'
                                  }}
                                >
                                  {member.role}&nbsp;<MdKeyboardArrowDown />
                                </Box>
                                <Menu
                                  id="demo-customized-menu"
                                  MenuListProps={{
                                    'aria-labelledby': 'demo-customized-button',
                                  }}
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={handleClose}
                                >
                                  <MenuItem
                                    accessKey={idx}
                                    onClick={(event) => handleClose(event, 'User', idx)}
                                    disableRipple
                                  >
                                    User
                                  </MenuItem>
                                  <MenuItem
                                    accessKey={idx}
                                    onClick={(event) => handleClose(event, 'Admin', idx)}
                                    disableRipple
                                  >
                                    Admin
                                  </MenuItem>
                                </Menu>
                              </>
                            }
                            title={member?.first_name + " " + member?.last_name}
                            subheader={member?.email}
                          />
                        </Card>
                      </Grid>
                      <Grid container item xs={2} alignItems='center' justifyContent='center'>
                        <IconButton onClick={() => onMemberDelete(idx)} color='error'><MdDelete /></IconButton>
                      </Grid>
                    </Grid>
                  )
                })}
                {inviteError && inviteError.data && inviteError.data.errors && (
                  <Grid container sx={{ marginBottom: '10px' }}>
                    <Grid item xs={12} lg={4} />
                    <Grid item xs={12} lg={8} >
                      <Alert severity="error">
                        {Object.keys(inviteError.data.errors).map(key => {
                          return (
                            <>
                              {inviteError.data.errors[key][0]}<br />
                            </>
                          )
                        })}
                      </Alert>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </>
          )}
          {uploadLogoError && uploadLogoError.data && uploadLogoError.data.errors && (
            <Grid container sx={{ marginBottom: '10px' }}>
              <Grid item xs={12} lg={4} />
              <Grid item xs={12} lg={8} >
                <Alert severity="error">
                  {Object.keys(uploadLogoError.data.errors).map(key => {
                    return (
                      <>
                        {uploadLogoError.data.errors[key][0]}<br />
                      </>
                    )
                  })}
                </Alert>
              </Grid>
            </Grid>
          )}
          {companySaveError && companySaveError.data && companySaveError.data.errors && (
            <Grid container sx={{ marginBottom: '10px' }}>
              <Grid item xs={12} lg={4} />
              <Grid item xs={12} lg={8} >
                <Alert severity="error">
                  {Object.keys(companySaveError.data.errors).map(key => {
                    return (
                      <>
                        {companySaveError.data.errors[key][0]}<br />
                      </>
                    )
                  })}
                </Alert>
              </Grid>
            </Grid>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            {/* {activeStep !== 0 && (
              <Button
                color="primary"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            )} */}
            {(
              isCompanySaveLoading ||
              isUploadLogoLoading ||
              isInviteLoading
            ) ? (
              <LoadingButton loading variant="contained">Complete</LoadingButton>
            ) : (
              <Button
                sx={{
                  textTransform: 'none',
                  padding: '14px 55.5px',
                  fontSize: '18px',
                  borderRadius: '8px',
                  marginTop: '16px',
                  marginRight: '16px',
                }}
                onClick={handleNext} 
                variant="contained"
                color="primary"
                disabled={isDisabled}
              >
              Save and continue
              </Button>
            )}
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
