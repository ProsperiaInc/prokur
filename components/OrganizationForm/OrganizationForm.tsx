import styled from "@emotion/styled"
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography, Paper, alpha, Chip, chipClasses } from "@mui/material"
import { useTranslation } from "next-i18next"
import { MdAdd, MdFace } from 'react-icons/md'

const StyledList = styled(ListItem)(({ theme }: any) => `
  width: 100%;
  border: 1px solid ${theme.palette.secondary.dark};
  max-width: 640px;
  margin: 10px;
  padding: 2px;
  border-radius: 4px;
  min-height: 72px;
  &:hover {
    cursor: pointer;
    background-color: ${alpha(theme.palette.secondary.dark, 0.1)};
    border-color: ${alpha(theme.palette.secondary.dark, 0.1)};
  }
`)

const StyledChip = styled(Chip)(({ theme }: any) => `
  border-radius: 6px;
  border-width: 2px;
  font-size: 20px;
  height: 25px;
  width: 25px;
  & .${chipClasses.label} {
    padding: 0
  }
  & .${chipClasses.iconSmall} {
    margin: 0
  }
`)


const OrganizationForm = ({ onRegisterCompany, user }: any) => {
  const { t } = useTranslation('common')
  const { desired_company_name } = user || {}
  const key = !!desired_company_name ? 'found' : 'not_found'

  return (
    <Grid
      container
      sx={{
        pt: { xs: 12, lg: 10 }
      }}
    >
      <Grid container justifyContent='center' sx={{ marginBottom: '10px' }}>
        <Typography variant='h4'>{t(`organization.${key}.title`)}</Typography>
      </Grid>
      <Grid container justifyContent='center' sx={{ marginBottom: '95px' }}>
        <Typography variant='body1' color='#4f4f4f'>{t(`organization.${key}.subtitle`)}</Typography>
      </Grid>
      {/* {desired_company_name && (
        <Grid container justifyContent='center'>
          <StyledList>
            <ListItem secondaryAction={<Typography variant='body2' sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>{t(`organization.sendJoinRequest`)}</Typography>}>
              <ListItemAvatar><Avatar>{" "}</Avatar></ListItemAvatar>
              <ListItemText primary="Company name" secondary='companyOwner@companydomain.com' />
            </ListItem>
          </StyledList>
        </Grid>
      )} */}
      {desired_company_name && (
        <Grid container justifyContent='center'>
          <StyledList onClick={onRegisterCompany}>
            <ListItem secondaryAction={
              <StyledChip variant="outlined" sx={{ color: '#6980A5', borderColor: '#6980A5' }} size="small" icon={<MdAdd />} />
            }>
              <ListItemText primary={`Register ${desired_company_name}”`} />
            </ListItem>
          </StyledList>
        </Grid>
      )}
    </Grid>
  )
}

export default OrganizationForm