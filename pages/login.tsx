import React from 'react';
import Image from 'next/image'
import { Box, Grid, Typography } from '@mui/material';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LoginForm from 'components/LoginForm/LoginForm';
import LoginImage from 'assets/images/login-image.svg';
import { useLoginMutation } from 'services/auth';
import CTA from 'components/CTA/CTA';

const Login = () => {
  const { t } = useTranslation('common');
  const [login, result] = useLoginMutation()
  const { status } = result || {}
  const isLoading = status === QueryStatus.pending

  return (
    <Grid container alignItems='center'>
      <Grid className='image-container' item md={5}>
        <LoginImage />
      </Grid>
      <Grid flexDirection='column' container item md={7} sx={{ padding: '30px' }}>
        <Box height='100px' sx={{ width: '100%', maxWidth: '500px', margin: '50px auto' }}>
          <Grid item justifyContent='center' alignItems='center' >
            <Typography variant='h6' fontSize='18px' color='secondary.dark' fontWeight={600}>{t('login.subheader')}</Typography>
            <Typography variant='h5' fontWeight={600} sx={{ marginTop: '10px' }}>{t('login.header')}</Typography>
            <Grid container columnSpacing='10'>
              <Grid item><Typography>{t('login.text')}</Typography></Grid>
              <Grid item><CTA href='/signup'>{t('login.cta')}</CTA></Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
          <LoginForm 
            onSubmit={login}
            isLoading={isLoading}
          />
        </Box>
      </Grid>
    </Grid>
  )
};

export const getStaticProps = async ({ locale } : { locale: 'en' | 'es' }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default Login;
