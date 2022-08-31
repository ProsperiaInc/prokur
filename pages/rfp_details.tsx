import RfpDetails from "components/RfpDetails/RfpDetails";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Dashboard from "./dashboard_wrapper";

const RFPDetails = () => {
  return (
    <Dashboard>
      <RfpDetails />
    </Dashboard>
  )
}

export const getStaticProps = async ({ locale } : { locale: 'en' | 'es' }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  }
})

export default RFPDetails