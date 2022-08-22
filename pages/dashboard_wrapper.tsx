import { Grid } from '@mui/material'
import Page from 'components/Page/Page'

const Dashboard = ({ children } : any) => {
  return (
    <Grid>
      <Page>
        {children}
      </Page>
    </Grid>
  )
}

export default Dashboard
