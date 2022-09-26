import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions, { cardActionsClasses } from '@mui/material/CardActions';
import CardContent, { cardContentClasses } from '@mui/material/CardContent';
import Button, { buttonClasses } from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MdWatchLater, MdArrowForward, MdLightbulb, MdLiveHelp } from 'react-icons/md'
import styled from '@emotion/styled';
import { Divider } from '@mui/material';

const Root = styled(Box)(({ theme }) => ({
  minWidth: '275px',
  [`& .${cardContentClasses.root}`]: {
    padding: '25px 16px'
  },
  [`& .${cardActionsClasses.root}`]: {
    paddingBottom: '27px',
    paddingTop: '18px',
    paddingLeft: '16px',
    paddingRight: '16px',
  }
}))

const CardTitle = styled(Typography)(({ theme, variant }: any) => ({
  fontSize: '16px',
  fontWeight: 400,
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '16px',
  color: theme.palette?.[variant]?.main,
}))

const CtaButton = styled(Button)(({ theme, variant }: any) => ({
  fontWeight: 400,
  fontSize: '14px',
  color: theme.palette.text.primary,
  [`&:hover`]: {
    backgroundColor: 'initial',
    transition: 'margin-left .3s ease-in-out',
    [`& .${buttonClasses.endIcon}`]: {
      marginLeft: '16px',
      transition: 'margin-left .3s ease-in-out',
    }
  },
  [`& .${buttonClasses.endIcon}`]: {
    color: theme.palette?.[variant]?.main,
    transition: 'margin-left .3s ease-in-out',
  }
}))

export default function ActivityCard({ variant = 'primary' }) {
  const VariantIcon: { [x: string]: any } = {
    primary: MdLightbulb,
    warning: MdWatchLater,
    error: MdLiveHelp,
  }
  const VariantIconComp = VariantIcon[variant]

  return (
    <Root>
      <Card variant={variant}>
        <CardContent>
          <CardTitle variant={variant}>
            <VariantIconComp />
            <span>
              Word of the Day
            </span>
          </CardTitle>
          <Typography variant="h5" component="div" mb='16px'>
            Closing soon
          </Typography>
          <Typography variant="body2" mb='24px' maxWidth='300px' sx={{ color: '#4F4F4F' }}>
            This RFX is closing soon and has not yet been assigned a winner.
          </Typography>
        </CardContent>
        <Divider sx={{ marginRight: '16px', marginLeft: '16px' }} />
        <CardActions>
          <CtaButton variant={variant} endIcon={<MdArrowForward />} disableRipple>Data Visualization Software</CtaButton>
        </CardActions>
      </Card>
    </Root>
  );
}
