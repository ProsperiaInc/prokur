import React from 'react';
import Image from 'next/image'
import { Box, Grid, Typography } from '@mui/material';
import loginImage from 'assets/images/login-image.svg';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CTA from 'components/CTA/CTA';
import SignupForm from 'components/SignupForm/SignupForm';

const Signup = () => {
  const { t } = useTranslation('common');
  
  return (
    <Grid container alignItems='center'>
      <Grid className='image-container' item md={5}>
        <Image src={loginImage} alt="Login Image" />
      </Grid>
      <Grid flexDirection='column' container item md={7} sx={{ padding: '30px' }}>
        <Box height='100px' sx={{ width: '100%', maxWidth: '500px', margin: '50px auto' }}>
          <Grid item justifyContent='center' alignItems='center' >
            <Typography variant='h6' fontSize='18px' color='secondary.dark' fontWeight={600}>{t('signup.subheader')}</Typography>
            <Typography variant='h5' fontWeight={600} sx={{ marginTop: '10px' }}>{t('signup.header')}</Typography>
            <Grid container columnSpacing='10'>
              <Grid item><Typography>{t('signup.text')}</Typography></Grid>
              <Grid item><CTA href='/login'>{t('signup.cta')}</CTA></Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
          <SignupForm />
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

export default Signup;
