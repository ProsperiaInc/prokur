import { Box, CircularProgress } from "@mui/material"

const PageLoader = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default PageLoader