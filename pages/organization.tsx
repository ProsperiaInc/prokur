import OrganizationForm from 'components/OrganizationForm/OrganizationForm';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLazyCompanySearchQuery } from 'services/company';
import { selectUser } from 'store/features/auth/authSlice';
import Dashboard from './dashboard_wrapper';

const Organization = () => {
  const router = useRouter()
  const user = useSelector(selectUser)
  const [companySearch, result] = useLazyCompanySearchQuery()
  const onRegisterCompany = () => router.push('/onboarding')
  const { desired_company_name } = user || {}

  useEffect(() => {
    companySearch({ name: desired_company_name })
  }, [])


  return (
    <Dashboard noDrawer>
      <OrganizationForm user={user} onRegisterCompany={onRegisterCompany} />
    </Dashboard>
  )
};

export const getStaticProps = async ({ locale } : { locale: 'en' | 'es' }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default Organization;
