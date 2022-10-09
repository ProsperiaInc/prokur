import type { NextPage } from 'next'
import Dashboard from './dashboard_wrapper'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import VerificationForm from 'components/VerificationForm/VerificationForm'
import PageLoader from 'components/PageLoader/PageLoader'
import { useLazyResendEmailQuery, useVerifyEmailMutation } from 'services/auth'
import { useEffect, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectUser } from 'store/features/auth/authSlice'
import { useTranslation } from 'next-i18next'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

const Verify: NextPage = () => {
  const { t } = useTranslation('common')
  const [error, setError] = useState<SerializedError | FetchBaseQueryError | null>(null)
  const [resendEmail, { isLoading: isResendEmailLoading, isUninitialized: isResendEmailUninitialized }] = useLazyResendEmailQuery()
  const [verifyEmail, { isLoading: isVerifyEmailLoading, isUninitialized: isVerifyEmailUninitialized, data: verifyEmailData, error: verifyEmailError }] = useVerifyEmailMutation()
  const { email_verified_at } = useSelector(selectUser) || {};
  const router = useRouter()
  const isLoading = [
    isResendEmailLoading,
    isVerifyEmailLoading,
    isResendEmailUninitialized,
    isVerifyEmailUninitialized
  ].reduce(
    (acc, item) => acc && !!item,
    false
  )

  useEffect(() => { if (!email_verified_at) resendEmail('send'); }, []);
  useEffect(() => { if(!!verifyEmailData) router.replace('/organization')}, [verifyEmailData])
  useEffect(() => { 
    if(!!verifyEmailError) {
      setError(verifyEmailError)
      setTimeout(() => setError(null), 3000)
    }
  }, [verifyEmailError])

  return (
    <Dashboard noDrawer noLink>
      <Snackbar open={!!error}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {t('verification.error.invalid_code')}
        </Alert>
      </Snackbar>
      {(isLoading)
        ? <PageLoader />
        : <VerificationForm verifyEmail={verifyEmail} resendEmail={resendEmail} />
      }
    </Dashboard>
  )
}

export const getStaticProps = async ({ locale } : { locale: 'en' | 'es' }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default Verify
