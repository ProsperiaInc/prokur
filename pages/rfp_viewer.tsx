import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import PageLoader from "components/PageLoader/PageLoader";
import RFPViewer from "components/RfpViewer/RfpViewer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLazyGetRfpAttachmentQuery, useLazyGetRfpQuery } from "services/rfp";
import Dashboard from "./dashboard_wrapper";

const RFPEditorPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [getRfp, payload] = useLazyGetRfpQuery()
  const [getRfpAttachment, { data: rfpAttachments }] = useLazyGetRfpAttachmentQuery();
  const { data, error, isLoading, isUninitialized } = payload

  const fieldData = data?.template?.sections?.reduce((
    acc: any, 
    { fields }: any) => 
    ({
      ...acc,
      ...(fields.reduce((acc: any, { name, value }: any) => ({ ...acc, [name]: value }), {})),
    }),
  {}) || {}

  fieldData.tagsTags = fieldData?.tags
  fieldData.budgetCurrency = fieldData?.budget?.replaceAll(',', '')
  fieldData.rfpSecondaryCategory = fieldData?.categories?.select_two
  fieldData.categories = fieldData?.categories?.select_one
  fieldData.scope_requirements = fieldData?.scope_requirements?.map((item: any) => ({
    requirements: item
  }))
  fieldData.evaluationMetrics = fieldData?.evaluation_criteria?.graph_inputs?.map((item: any) => ({
    evaluationMetrics: item.title,
    weight: item.value
  }))
  
  delete fieldData?.tags
  delete fieldData?.budget
  delete fieldData?.evaluation_criteria


  useEffect(() => { 
    if(id && typeof id === 'string') {
      getRfp(id)
      getRfpAttachment({ rfpId: id, sectionIndex: 3 });
    }
  }, [id])

  console.warn({ rfpAttachments })

  return (
    <Dashboard noDrawer>
      {(isLoading || isUninitialized)
        ? <PageLoader />
        : <RFPViewer data={{
          ...data,
          attachments: rfpAttachments,
          fieldData
        }} error={error} isLoading={isLoading} />
      }
    </Dashboard>
  )
}

export const getStaticProps = async ({ locale, ...op } : { locale: 'en' | 'es' }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  }
})

export default RFPEditorPage