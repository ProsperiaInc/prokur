import React, { useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Grid } from '@mui/material'
import { VerticalStepper } from 'components/VerticalStepper/VerticalStepper'
import PageHeader from 'components/PageHeader/PageHeader'
// import { setCategories } from 'store/slices/rfp'
import { useSelector } from 'react-redux'
import get from 'lodash/get'
// import Logger from 'utils/logger'
import { useDispatch } from 'react-redux'
import Form from 'components/Form'
import schema from 'forms/rfp/editor/schema.json'
import uischema from 'forms/rfp/editor/uischema.json'

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

export default function RfpEditor({ id }: any) {
  const [data, setData] = useState([]);
  const dispatch = useDispatch()
  
  // const loadSetCategories = useCallback(
  //   async () => {
  //     try {
  //       await dispatch(setCategories())
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }, 
  // []);
  
  // useEffect(() => { loadSetCategories() }, [])

  return (
    <Box mt='88px'>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        flexDirection='column'
        height={'100%'}
      >
        <PageHeader
          backButton
          title='Salesforce, Inc.'
          subtitle='Data Visualization RFP'
        />
        <VerticalStepper steps={steps} >
          {(activeStep: any) => (
            <Form
              name='rfp_editor'
              initialData={data?.[activeStep]}
              schema={steps?.[activeStep]?.json.schema}
              uischema={steps?.[activeStep]?.json.uischema}
            />
          )}
        </VerticalStepper>
      </Grid>
    </Box>
  );
}
