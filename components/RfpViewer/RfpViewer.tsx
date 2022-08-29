import styled from "@emotion/styled";
import { Grid, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import CTA from "components/CTA/CTA";
import schema from 'forms/rfp/editor/schema'
import uischema from 'forms/rfp/editor/uischema'
import parseDate from "utils/dateHelper";
import { MdDownload } from 'react-icons/md'
import formatCurrency from "utils/formatCurrency";

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

const Section = styled(Box)(() => `
  margin-bottom: 40px;
`)

const Legend = styled(Box)(({ theme }: { theme?: any }) => `
  color: ${theme.palette.secondary.dark};
  max-width: 300px;
  margin-left: 15px;
  position: relative;
  &:before {
    content: " ";
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: ${theme.palette.secondary.dark};
  }
`)

const SectionParagraph = styled(Typography)(() => `
  word-wrap: break-word;
`)

const Cell = styled(TableCell)(({ theme }: any) => `
  border-right: 1px solid ${theme.palette.secondary.dark};
  border-top: 1px solid ${theme.palette.secondary.dark};
  border: 1px solid ${theme.palette.secondary.dark}
`)
const Head  = styled(TableCell)(({ theme }: any) => `
  padding-left: 0;
  border-bottom: 1px solid ${theme.palette.secondary.dark};
`)

const RFPViewer = ({ error, data = {}, isLoading }: { error?: FetchBaseQueryError | SerializedError , data: any, isLoading: boolean }) => {
  const { fieldData, created_by, company } = data
  const { first_name, last_name, email, number, assigned_role } = created_by || {}
  const { legal_name } = company || {}

  return (
    <>
      <Box 
        sx={{
          position: 'sticky',
          top: '100px',
          left: '100%',
          width: 'fit-content'
        }}>
        <CTA>
          <MdDownload style={{ fontSize: '24px' }} />&nbsp;
          Download
        </CTA>
      </Box>
      <Box sx={{ maxWidth: '700px', padding: 12, margin: '0 auto' }}>
        <Section>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Data Visualization RFP</Typography>
        </Section>
        <Section>
          <Legend>
            <Typography variant='body2'>
              <List dense sx={{ paddingBottom: 0, paddingTop: 0 }}>
                {first_name && last_name && <ListItem><ListItemText sx={{ fontWeight: 'bold', margin: 0 }} primary={first_name + ' ' + last_name} /></ListItem>}
                {assigned_role && <ListItem><ListItemText sx={{ margin: 0, paddingTop: 0, paddingBottom: 0 }}  primary={assigned_role} /></ListItem>}
                {legal_name && <ListItem><ListItemText sx={{ margin: 0, paddingTop: 0, paddingBottom: 0 }} primary={legal_name} /></ListItem>}
                {number && <ListItem><ListItemText sx={{ margin: 0, paddingTop: 0, paddingBottom: 0 }} primary={number} /></ListItem>}
                {email && <ListItem><ListItemText sx={{ margin: 0, paddingTop: 0, paddingBottom: 0 }} primary={email} /></ListItem>}
              </List>
            </Typography>
          </Legend>
        </Section>
        <Section>
          <Grid container justifyContent='space-between'>
            <Grid item><Typography variant='body1' color='grey.600'>Inquiry Deadline:</Typography></Grid>
            <Grid item><b>{parseDate(fieldData['inquiry_deadline'])}</b></Grid>
          </Grid>
          <Grid container justifyContent='space-between'>
            <Grid item><Typography variant='body1' color='grey.600'>Close Date:</Typography></Grid>
            <Grid item><b>{parseDate(fieldData['close_date'])}</b></Grid>
          </Grid>
          <Grid container justifyContent='space-between'>
            <Grid item><Typography variant='body1' color='grey.600'>Estimated Budget:</Typography></Grid>
            <Grid item><b>{formatCurrency(fieldData['budgetCurrency'])}</b></Grid>
          </Grid>
        </Section>
        {steps.map(step => (
          <Section>
            <Section>
              <Typography variant="h5" textTransform='uppercase'>{step.optional}</Typography>
            </Section>
            {Object.keys(step.json.schema.properties).map((property: string) => (
              <>
                {fieldData[property] && typeof fieldData[property] === 'string' && (
                  <Section>
                    <Typography variant="h6">{(step.json.schema.properties as any)[property]?.label}</Typography>
                    <SectionParagraph variant='body1' color='grey.600'>{fieldData[property]}</SectionParagraph>
                  </Section>
                )}
                {fieldData[property] && Array.isArray(fieldData[property]) && typeof fieldData[property][0] === 'string' && (
                  <Section>
                    <Typography variant="h6">{(step.json.schema.properties as any)[property]?.label}</Typography>
                    <SectionParagraph variant='body1' color='grey.600'>{fieldData[property].join(', ')}</SectionParagraph>
                  </Section>
                )}
                {fieldData[property] && Array.isArray(fieldData[property]) && typeof fieldData[property][0] === 'object' &&  Object.keys(fieldData[property][0]).length === 1 && (
                  <Section>
                    <Typography variant="h6">{(step.json.schema.properties as any)[property]?.label}</Typography>
                    <ul style={{ paddingLeft: '12px' }}>
                      {fieldData[property].map((item: any) => (
                        <li key={item[Object.keys(item)[0]]}>
                          <ListItemText primary={item[Object.keys(item)[0]]} />
                        </li>
                      ))} 
                    </ul>
                  </Section>
                )}
                {fieldData[property] && Array.isArray(fieldData[property]) && typeof fieldData[property][0] === 'object' &&  Object.keys(fieldData[property][0]).length > 1 && (
                  <TableContainer sx={{ border: 'none' }} component={Box}>
                    <Table size='small'>
                      <TableHead>
                        <TableRow>
                          {Object.keys(fieldData[property][0]).map(prop => (
                            <Head>{(step.json.schema.properties as any)[property].items.properties[prop]?.label}</Head>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {fieldData[property].map((field: any) => (
                          <TableRow key={field[Object.keys(field)[0]]}>
                            {Object.keys(field).map(key => (
                              <Cell>{field[key]}</Cell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </>
            ))}
          </Section>
        ))}
      </Box>
    </>
  )
};

export default RFPViewer;
