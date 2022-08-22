import type { NextPage } from 'next'
import Dashboard from './dashboard_wrapper'
import MyRfps from 'components/MyRfps/MyRfps'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Home: NextPage = () => {
  return (
    <Dashboard>
      <MyRfps />
    </Dashboard>
  )
}

export const getStaticProps = async ({ locale } : { locale: 'en' | 'es' }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default Home
