import styled from "@emotion/styled";
import { Button } from "@mui/material";
import Link from "next/link";
import { ReactElement } from "react";

const StyledButton = styled(Button)`
  font-weight: bold;
  text-transform: none;
  padding: 0;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0;
  &:hover {
    background-color: transparent;
    opacity: 0.8;
    transition: opacity 0.2s ease-in-out;
  }
`


const CTA = ({ children, href, ...props } : { children: ReactElement, href: string }) => {
  return (
    <StyledButton
      variant="text"
      color="primary"
      disableRipple
      {...props}
    >
      <Link
        href={href}
      >
        {children}
      </Link>
    </StyledButton>
  )
}

export default CTA;