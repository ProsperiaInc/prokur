import PageLoader from "components/PageLoader/PageLoader";
import RfpEditor from "components/RFPEditor/RFPEditor";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLazyGetRfpCategoriesQuery, useLazyGetRfpQuery } from "services/rfp";
import Dashboard from "./dashboard_wrapper";

const RFPEditorPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [getRfp, payload] = useLazyGetRfpQuery()
  const [getRfpCategories, { data: categories, isLoading, isUninitialized }] = useLazyGetRfpCategoriesQuery()
  const fieldData = { ...(payload?.data?.values || {}) }
  fieldData.tagsTags = fieldData?.tags
  fieldData.budgetCurrency = typeof fieldData?.budget === 'number' ? fieldData?.budget : Number(fieldData?.budget?.replaceAll(',', ''))
  delete fieldData?.tags
  delete fieldData?.budget

  useEffect(() => { getRfpCategories('') }, [])
  useEffect(() => { if(id && typeof id === 'string') getRfp(id) }, [id])
  const viewRfp = () => router.push('/rfp_viewer/?id='+id)

  return (
    <Dashboard noDrawer>
      {(isLoading || isUninitialized) && (<PageLoader />)}
      {categories && categories.length && <RfpEditor id={id} categories={categories} initialData={fieldData} viewRfp={viewRfp} />}
    </Dashboard>
  );
}

export const getStaticProps = async ({ locale } : { locale: 'en' | 'es' }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  }
})

export default RFPEditorPage