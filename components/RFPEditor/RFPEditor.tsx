import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Grid } from '@mui/material'
import { VerticalStepper } from 'components/VerticalStepper/VerticalStepper'
import PageHeader from 'components/PageHeader/PageHeader'
import { useDispatch, useSelector } from 'react-redux'
import Form from 'components/Form'
import schema from 'forms/rfp/editor/schema'
import uischema from 'forms/rfp/editor/uischema'
import { selectForm, setForm } from 'store/features/forms/formsSlice'
import { useSaveRfpMutation } from 'services/rfp'
import { useRouter } from 'next/router'

const FORM_NAME = 'rfp_editor'

const steps = [
  {
    label: 'Step 1',
    optional: 'RFX Details',
    json: {
      schema: schema[0],
      uischema: uischema[0]
    },
  },
  {
    label: 'Step 2',
    optional: 'Scope of Work',
    json: {
      schema: schema[1],
      uischema: uischema[1]
    },
  },
  {
    label: 'Step 3',
    optional: 'Evaluation',
    json: {
      schema: schema[2],
      uischema: uischema[2]
    },
  },
  {
    label: 'Step 4',
    optional: 'Attachments',
    json: {
      schema: schema[3],
      uischema: uischema[3]
    },
  }
]

export default function RfpEditor({ id, categories, initialData, viewRfp }: any) {
  const { data, ...rest } = useSelector(selectForm(FORM_NAME))
  const dispatch = useDispatch()
  const router = useRouter()
  const [saveRfpMutation, { data: saveRfpData }] = useSaveRfpMutation()
  const [isSummary, setIsSummary] = useState(false)
  // const onSubmit = () => viewRfp()
  const onSubmit = () => {
    const formData = { ...data }
    formData.tags = data.tagsTags
    formData.budget = data.budgetCurrency
    delete formData.tagsTags
    delete formData.budgetCurrency
    saveRfpMutation(formData)
    // saveRfpMutation({
    //   "name": "Template 1",
    //   "template": {
    //     "icon": "location-arrow",
    //     "title": "My Title",
    //     "sections": steps.map(({ json: { schema } }) => ({
    //       title: "",
    //       fields: Object.keys(schema.properties).map(field => ({
    //         [field.replace('Tags', '').replace('Upload', '')]: {
    //           "meta": {
    //             "type": "text",
    //             "source": null,
    //             "options": [],
    //             "multiple": false,
    //             "placeholder": null
    //           },
    //           "name": field,
    //           "label": "label",
    //           "value": data[field],
    //           "column": 6
    //         }
    //       })),
    //       "required": true,
    //       "description": "Provide a detailed timeline for your project and establish boundaries to help improve the correlative accuracy of your RFX for potential vendors.",
    //       "not_included": false
    //     }))
    //   },
    //   "validation": {
    //     "tags": {
    //       "required": true
    //     },
    //     "title": {
    //       "required": true
    //     },
    //     "budget": {
    //       "required": true
    //     },
    //     "categories": {
    //       "required": true
    //     },
    //     "close_date": {
    //       "min": "field_inquiry_deadline",
    //       "required": true
    //     },
    //     "scope_summary": {
    //       "required": true
    //     },
    //     "inquiry_deadline": {
    //       "required": true
    //     },
    //     "evaluation_summary": {
    //       "required": true
    //     },
    //     "scope_requirements": {
    //       "required": true
    //     },
    //     "evaluation_criteria": {
    //       "required": true
    //     }
    //   }
    // })
  }

  useEffect(() => {
    if(saveRfpData) router.push(saveRfpData.id)
  }, [saveRfpData])

  useEffect(() => {
    dispatch(
      setForm({
        rfp_editor: {
          ...rest,
          data: initialData
        }
      }
    ))
  }, [])

  return (
    <Box mt='88px'>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        flexDirection='column'
        height={'100%'}
      >
        {!isSummary && (
          <>
            <PageHeader
              backButton
              title='Salesforce, Inc.'
              subtitle='Data Visualization RFX'
              onBack={() => {
                dispatch(
                  setForm({
                    rfp_editor: {
                      ...rest,
                      data: {}
                    }
                  }
                ))
              }}
            />
            {!!steps.length && (
              <VerticalStepper steps={steps} onSubmit={onSubmit}>
                {(activeStep: any) => (
                  <Form
                    initialData={initialData}
                    name={FORM_NAME}
                    schema={steps?.[activeStep]?.json.schema}
                    uischema={steps?.[activeStep]?.json.uischema}
                  />
                )}
              </VerticalStepper>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
}
