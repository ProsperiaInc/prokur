import styled from "@emotion/styled"
import { Chip, alpha } from "@mui/material"

const StatusChip = styled(Chip)(({ theme, color }) => {
  return {
    backgroundColor: alpha(theme.palette?.[color]?.main, 0.2),
    color: theme.palette?.[color]?.main,
    borderRadius: '10px'
  }
})

export {
  StatusChip
}