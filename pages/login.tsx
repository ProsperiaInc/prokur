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
    <Grid
      container
      alignItems='center'
      sx={{ background: '#f3f5fd', height: '100%' }}
    >
      <Box sx={{ width: '100%', maxWidth: '500px', margin: '50px auto', background: 'white', padding: '53px 98px' }}>
        <Typography variant='h6' fontSize='18px' color='secondary.dark' fontWeight={600}  marginBottom='16px'>{t('login.subheader')}</Typography>
        <Typography variant='h5' fontWeight={600} sx={{ marginTop: '10px' }}  marginBottom='14px'>{t('login.header')}</Typography>
        <Grid container columnSpacing='10' marginBottom='30px'>
          <Grid item><Typography>{t('login.text')}</Typography></Grid>
          <Grid item><CTA href='/signup'>{t('login.cta')}</CTA></Grid>
        </Grid>
        <LoginForm 
          onSubmit={login}
          isLoading={isLoading}
        />
      </Box>
    </Grid>
  )
};

export const getStaticProps = async ({ locale } : { locale: 'en' | 'es' }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default Login;
