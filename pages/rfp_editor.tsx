import PageLoader from "components/PageLoader/PageLoader";
import RfpEditor from "components/RFPEditor/RFPEditor";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLazyGetRfpCategoriesQuery } from "services/rfp";
import Dashboard from "./dashboard_wrapper";

const RFPEditorPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [getRfpCategories, { data: categories, isLoading, isUninitialized }] = useLazyGetRfpCategoriesQuery()

  useEffect(() => { getRfpCategories('') }, [])
  return (
    <Dashboard noDrawer>
      {(isLoading || isUninitialized) && (<PageLoader />)}
      {categories && categories.length && <RfpEditor id={id} categories={categories} />}
    </Dashboard>
  );
}

export const getStaticProps = async ({ locale, ...op } : { locale: 'en' | 'es' }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  }
})

export default RFPEditorPage