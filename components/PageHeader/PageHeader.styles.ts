import styled from "@emotion/styled"
import { Button, buttonClasses } from "@mui/material"

const BackButton = styled(Button)((theme) => ({
  [`&.${buttonClasses.root}`]: {
    padding: 0,
    transition: 'opacity .3s ease-in-out',
    [`&:hover`]: {
      backgroundColor: 'transparent',
      opacity: .7,
      transition: 'opacity .3s ease-in-out',
    }
  }
}))

export {
  BackButton
}