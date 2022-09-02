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

  const { data, error, isLoading: rfpIsLoading, isUninitialized: rfpIsUninitialized } = payload
  const fieldData = data?.template?.sections?.reduce((
    acc: any, 
    { fields }: any) => 
    ({
      ...acc,
      ...(fields.reduce((acc: any, { name, value }: any) => ({ ...acc, [name]: value }), {})),
    }),
  {}) || {}

  fieldData.tagsTags = fieldData?.tags
  fieldData.budgetCurrency = Number(fieldData?.budget?.replaceAll(',', ''))
  fieldData.rfpSecondaryCategory = fieldData?.categories?.select_two
  fieldData.categories = fieldData?.categories?.select_one
  fieldData.scope_requirements = fieldData?.scope_requirements?.map((item: any) => ({ requirements: item }))
  fieldData.evaluationMetrics = fieldData?.evaluation_criteria?.graph_inputs?.map((item: any) => ({ evaluationMetrics: item.title, weight: item.value }))

  delete fieldData?.tags
  delete fieldData?.budget
  delete fieldData?.evaluation_criteria

  useEffect(() => { getRfpCategories('') }, [])
  useEffect(() => { if(id && typeof id === 'string') getRfp(id) }, [id])


  return (
    <Dashboard noDrawer>
      {(isLoading || isUninitialized) && (<PageLoader />)}
      {categories && categories.length && <RfpEditor id={id} categories={categories} initialData={fieldData} />}
    </Dashboard>
  );
}

export const getStaticProps = async ({ locale } : { locale: 'en' | 'es' }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  }
})

export default RFPEditorPage