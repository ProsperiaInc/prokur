import React, { useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Button, Grid } from '@mui/material'
import { VerticalStepper } from 'components/VerticalStepper/VerticalStepper'
import PageHeader from 'components/PageHeader/PageHeader'
import { useDispatch, useSelector } from 'react-redux'
import Form from 'components/Form'
import schema from 'forms/rfp/editor/schema'
import uischema from 'forms/rfp/editor/uischema'
import { selectForm, setForm } from 'store/features/forms/formsSlice'
import { selectUser } from 'store/features/auth/authSlice'
import RFPViewer from 'components/RfpViewer/RfpViewer'

const FORM_NAME = 'rfp_editor'

const steps = [
  {
    label: 'Step 1',
    optional: 'RFP Details',
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

export default function RfpEditor({ id, categories, initialData }: any) {
  const { data, ...rest } = useSelector(selectForm(FORM_NAME))
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  // const [saveRfpMutation] = useSaveRfpMutation()
  const [isSummary, setIsSummary] = useState(false)
  const onSubmit = () => {
    setIsSummary(true)
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
    //       "description": "Provide a detailed timeline for your project and establish boundaries to help improve the correlative accuracy of your RFP for potential vendors.",
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
              subtitle='Data Visualization RFP'
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
        {isSummary && (
          <>
            <RFPViewer
              data={{
                created_by: user,
                company: user?.company,
                fieldData: data
              }}
              isLoading={false}
            />
            <Grid container justifyContent='space-between'>
              <Grid container item md={6} xs={12} alignItems='center' justifyContent='flex-start'>
                <Button variant='outlined' sx={{ margin: '10px 0' }}>Back</Button>
              </Grid>
              <Grid item container md={6} xs={12} justifyContent={{ xs: 'flex-start', md: 'flex-end' }} flexDirection={{ xs: 'column-reverse', md: 'row' }}>
                <Button sx={{ margin: '10px' }}>Save draft</Button>
                <Button variant="contained" sx={{ margin: '10px 0' }}>Finish</Button>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}
