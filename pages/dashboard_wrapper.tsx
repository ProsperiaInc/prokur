import { Grid } from '@mui/material'
import Page from 'components/Page/Page'

const Dashboard = ({ children, noDrawer, noPadding } : any) => {
  return (
    <Grid>
      <Page noDrawer={noDrawer} noPadding={noPadding}>
        {children}
      </Page>
    </Grid>
  )
}

export default Dashboard
