import { useSelector } from 'react-redux'
import { selectAccessToken, selectIsAppLoading, selectUser } from 'store/features/auth/authSlice'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PageLoader from 'components/PageLoader/PageLoader'
import { useLazyGetUserInfoQuery } from 'services/auth'

const GUEST_ROUTES = ['/login', '/signup']
const PROTECTED_ROUTES = ['/', '/dashboard', '/rfp_editor', '/rfp_viewer', '/verify', '/organization', '/onboarding']
const VERIFY_ROUTE = '/verify'

function PageWrapper({ children } : { children: any }) {
  const router = useRouter()
  const isLoading = useSelector(selectIsAppLoading)
  const access_token = useSelector(selectAccessToken)
  const user = useSelector(selectUser)
  const [getUserInfo] = useLazyGetUserInfoQuery()
  const { email_verified_at, company } = user || {}
  const [isLoadingPage, setIsLoadingPage] = useState(user === null)

  useEffect(() => {
    if (access_token) getUserInfo('')
  }, [access_token])

  useEffect(() => {
    if(!isLoading) {
      if (access_token === null && PROTECTED_ROUTES.includes(router.pathname)) router.replace('/login')
      if (access_token && email_verified_at && company && [...GUEST_ROUTES, VERIFY_ROUTE].includes(router.pathname)) router.replace('/')
      if (access_token && user !== null && !email_verified_at && [...PROTECTED_ROUTES, ...GUEST_ROUTES].includes(router.pathname)) router.replace('/verify')
      if (access_token && user !== null && email_verified_at && !company && [...PROTECTED_ROUTES, ...GUEST_ROUTES].includes(router.pathname)) router.replace('/organization')
      if (access_token) getUserInfo('')
    }
    setIsLoadingPage(isLoading)
   }, [access_token, isLoading, email_verified_at])
  if (isLoadingPage) return <PageLoader />
  return children
}

export default PageWrapper
