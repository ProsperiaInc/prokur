import { Grid } from '@mui/material'
import Page from 'components/Page/Page'

const Dashboard = ({ children, noDrawer } : any) => {
  return (
    <Grid>
      <Page noDrawer={noDrawer}>
        {children}
      </Page>
    </Grid>
  )
}

export default Dashboard
