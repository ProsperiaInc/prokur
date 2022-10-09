import { Grid } from '@mui/material'
import Page from 'components/Page/Page'

const Dashboard = ({ children, noDrawer, noPadding, noLink } : any) => {
  return (
    <Grid>
      <Page noLink={noLink} noDrawer={noDrawer} noPadding={noPadding}>
        {children}
      </Page>
    </Grid>
  )
}

export default Dashboard
