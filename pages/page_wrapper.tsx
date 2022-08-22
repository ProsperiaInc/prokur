import { useSelector } from 'react-redux'
import { selectAccessToken, selectIsAppLoading } from 'store/features/auth/authSlice'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const GUEST_ROUTES = ['/login', '/signup']
const PROTECTED_ROUTES = ['/', '/dashboard']

function PageWrapper({ children } : { children: any }) {
  const access_token = useSelector(selectAccessToken)
  const isLoading = useSelector(selectIsAppLoading)
  const router = useRouter()
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  useEffect(() => { 
    if (access_token && GUEST_ROUTES.includes(router.pathname)) router.replace('/')
    if (!access_token && PROTECTED_ROUTES.includes(router.pathname)) router.replace('/login')
    setIsLoadingPage(isLoading)
   }, [access_token, isLoading])
  if (isLoadingPage) return <div>Loading...</div>
  return children
}

export default PageWrapper
