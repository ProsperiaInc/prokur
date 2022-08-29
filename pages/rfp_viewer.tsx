import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import PageLoader from "components/PageLoader/PageLoader";
import RFPViewer from "components/RfpViewer/RfpViewer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLazyGetRfpQuery } from "services/rfp";
import Dashboard from "./dashboard_wrapper";

const RFPEditorPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [getRfp, payload] = useLazyGetRfpQuery()
  const { data, error, isLoading, isUninitialized } = payload
  const fieldData: { [x: string]: any } = {
    "title": "42423",
    "inquiry_deadline": "2022-08-12",
    "budgetCurrency": "431243.00",
    "close_date": "2022-08-11",
    "categories": "Weekly",
    "rfpSecondaryCategory": "Monthly",
    "tagsTags": [
      "fdsfd"
    ],
    "scope_summary": "fdasfdf",
    "scope_requirements": [
      {
        "requirements": "fdsafd"
      },
      {
        "requirements": "fdasfd"
      }
    ],
    "evaluation_criteria": "fdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafd\nfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafd\nfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafd\n",
    "evaluation_summary": "fdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafd\nfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafd\nfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafdfdsafd\n",
    "evaluationMetrics": [
      {
        "evaluationMetrics": "4234",
        "weight": "5"
      },
      {
        "evaluationMetrics": "43243",
        "weight": "3"
      }
    ]
  }

  useEffect(() => { if(id && typeof id === 'string') getRfp(id) }, [id])
  return (
    <Dashboard noDrawer>
      {(isLoading || isUninitialized)
        ? <PageLoader />
        : <RFPViewer data={{
          ...data,
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