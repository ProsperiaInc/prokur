import OrganizationForm from 'components/OrganizationForm/OrganizationForm';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router';
import Dashboard from './dashboard_wrapper';

const Organization = () => {
  const router = useRouter()
  const onRegisterCompany = () => router.push('/onboarding')

  return (
    <Dashboard noDrawer>
      <OrganizationForm onRegisterCompany={onRegisterCompany} />
    </Dashboard>
  )
};

export const getStaticProps = async ({ locale } : { locale: 'en' | 'es' }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default Organization;
