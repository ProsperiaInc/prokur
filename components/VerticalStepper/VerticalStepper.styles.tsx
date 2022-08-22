import * as React from 'react';
import Box from '@mui/material/Box';
import StepLabel from '@mui/material/StepLabel';
import Step, { stepClasses } from '@mui/material/Step';
import { stepLabelClasses } from '@mui/material/StepLabel';
import { Button, StepConnector, stepConnectorClasses, typographyClasses } from '@mui/material';
import styled from '@emotion/styled';

export const VerticalStepperButton = styled(Button)(({ theme, active }: any) => ({
  textTransform: 'none',
  padding: '14px 55.5px',
  fontSize: '18px',
  borderRadius: '8px'
}))

export const VerticalStepperLabel = styled(StepLabel)(({ theme, active }: any) => ({
  [`& .${stepLabelClasses.label}`]: {
    fontSize: '1.12rem',
    fontWeight: '600',
    [`&.${stepLabelClasses.active}`]: {
      color: theme.palette.primary.main
    }
  },
  [`& .${stepLabelClasses.labelContainer}`]: {
    ...(active ? { color: theme.palette.primary.main } : {}),
    fontWeight: '400',
    [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
      [`.${typographyClasses.root}`]: {
        width: '100%',
        display: 'block',
        textAlign: 'center'
      }
    }
  },
  [`& .${stepLabelClasses.iconContainer}`]: {
    paddingRight: 0,
    [`@media (min-width: ${theme.breakpoints.values.md}px)`]: {
      paddingLeft: '40px'
    }
  },
  [`&.${stepLabelClasses.alternativeLabel}`]: {
    fontSize: '0.9rem',
    color: theme.palette.primary.main
  },
  [`&.${stepLabelClasses.root}`]: {
    padding: '0px'
  }
}))

export const VerticalStepperConnector = styled(StepConnector)(({ theme }: any) => ({
  [`@media (min-width: ${theme.breakpoints.values.md}px)`]: {
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        transition: 'all .6ms',
        borderColor: theme.palette.primary.main,
        borderWidth: 4,
        [`&:after`]: {
          backgroundColor: theme.palette.primary.main,
        }
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.primary.main,
        borderWidth: 4,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      transition: 'all .6ms',
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderWidth: 4
    },
    [`&.${stepConnectorClasses.root}`]: {
      position: 'relative',
      justifyContent: 'flex-end',
      display: 'flex',
      marginRight: '8px',
      marginLeft: 0,
      height: '25px',
      [`& .${stepConnectorClasses.line}:after`]: {
        transition: 'all .6ms',
        content: '" "',
        width: '4px',
        height: '100%',
        position: 'absolute',
        right: 0,
        top: '-100%',
        zIndex: -1,
        backgroundColor: theme.palette.secondary.main
      },
      [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
          [`&:after`]: {
            backgroundColor: theme.palette.primary.main,
          }
        },
      }
    }
  }
}));

export const VerticalStep = styled(Step)(({ theme, active }: any) => {
  return ({
    [`@media (min-width: ${theme.breakpoints.values.md}px)`]: {
      [`&.${stepClasses.root}`]: {
        position: 'relative',
      },
      [`&.${stepClasses.root}:after`]: {
        content: '" "',
        width: '4px',
        backgroundColor: active ? theme.palette.primary.main : theme.palette.secondary.main,
        height: '50%',
        position: 'absolute',
        right: '8px',
        top: 0,
        zIndex: -1
      }
    }
  })
})

export const TopBottomConnector = styled('div')(({ theme, active }: any) => ({
  [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
    display: 'none'
  },
  position: 'relative',
  height: '25px',
  borderRight: `4px solid ${active ? theme.palette.primary.main : theme.palette.secondary.main }`,
  width: 'calc(100% - 8px)',
  [`&:last-child:after`]: {
    content: '" "',
    width: '4px',
    height: '50%',
    position: 'absolute',
    // right: 0,
    top: '-50%',
    zIndex: -1,
    right: '-4px',
    backgroundColor: theme.palette.secondary.main,
    ...(active ? {
      backgroundColor: theme.palette.primary.main,
    }: {})
  }
}))

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


