import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import LoginImage from 'assets/images/login-image.svg';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CTA from 'components/CTA/CTA';
import SignupForm from 'components/SignupForm/SignupForm';
import { useSignupMutation } from 'services/auth';
import Dashboard from './dashboard_wrapper';
import Header from 'components/Header/Header';

const Signup = () => {
  const { t } = useTranslation('common');
  const [signup, result] = useSignupMutation()
  const { isLoading } = result || {}
  const onSubmit = (data: any) => signup(data)

  return (
    <>
      <Header
        withLogo
        drawerWidth={0}
      />
      {/* <Box
        sx={{ background: '#fff', height: '60px' }}
      >
        <Typography variant='h3'>Connecting businesses via simplified procurement</Typography>
      </Box> */}
      <Grid
        container
        alignItems='center' 
        sx={{ background: '#f3f5fd', height: '100%' }}
      >
        <Box sx={{ width: '100%', maxWidth: '500px', margin: '50px auto', background: 'white', padding: '53px 98px' }}>
          <Typography variant='h6' fontSize='18px' color='secondary.dark' fontWeight={600} marginBottom='16px'>{t('signup.subheader')}</Typography>
          <Typography variant='h5' fontWeight={600} marginBottom='14px'>{t('signup.header')}</Typography>
          <Grid container columnSpacing='4' marginBottom='30px'>
            <Grid item><Typography sx={{ fontWeight: 'bold', color: '#6c6c6c' }}  >{t('signup.text')}</Typography></Grid>
            <Grid item><CTA sx={{ minWidth: '50px' }} href='/login'>{t('signup.cta')}</CTA></Grid>
          </Grid>
          <SignupForm onSubmit={onSubmit} isLoading={isLoading} />
        </Box>
      </Grid>
    </>
  )
};

export const getStaticProps = async ({ locale } : { locale: 'en' | 'es' }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default Signup;
