import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Drawer as MuiDrawer,
  Box,
  listItemTextClasses,
  listItemIconClasses,
  listItemButtonClasses,
  typographyClasses,
  toolbarClasses
} from "@mui/material";
import Image from "next/image";
import { MdMoveToInbox, MdOutlineDescription, MdSaveAlt, MdSettings } from "react-icons/md";
import { TiArrowSync } from 'react-icons/ti'
import logo from 'assets/images/prokur-logo.png';
import styled from "@emotion/styled";
import Link from "next/link";
import { BiPackage } from 'react-icons/bi'
import { FaEnvelopeOpenText } from 'react-icons/fa'
import { BsGrid } from 'react-icons/bs'
import { GiOfficeChair } from 'react-icons/gi'
import { useRouter } from "next/router";

const StyledToolbar = styled(Toolbar)(({ theme }) => (`
  @media (min-width: 600px) {
    &.${toolbarClasses.root} {
      padding-left: 0;
      padding-right: 0;
    }
  }
`))

const StyledListItemText = styled(ListItemText)(
  ({ theme } : any) => `
    margin-left: 16px;
    color: ${theme.palette.secondary.dark};
    transition: color .3s;
    & .${typographyClasses.root} {
      font-size: 14px;
      line-height: 1;
      font-weight: 500;
    }
  `
)

const StyledListItemIcon = styled(ListItemIcon)(
  ({ theme } : any) => `
    min-width: initial;
    color: ${theme.palette.secondary.dark};
    transition: color .3s;
    font-weight: bold;
    font-size: 1.5rem;
  `
)

const StyledListItemButton = styled(ListItemButton)(
  ({ theme, active } : any) => {
    return `
      padding-top: 16px;
      padding-bottom: 16px;
      padding-left: 0;
      padding-right: 0;
      border: none;
      text-decoration: none;
      transition: all 0.5s ease-in-out;
      cursor: pointer;
      white-space: nowrap;
      width: 100%;
      width: -webkit-fill-available;
      font-size: 14px;
      &:hover { background-color: transparent; }
      &.${listItemButtonClasses.root}:hover .${listItemTextClasses.root},
      &.${listItemButtonClasses.root}:hover .${listItemIconClasses.root} {
        color: ${theme.palette.primary.main};
        transition: color .3s;
      }
      ${(active && `
        .${listItemTextClasses.root},
        .${listItemIconClasses.root} {
          color: ${theme.palette.primary.main};
          transition: color .3s;
        }
      `)}
    `
  }
)


const Drawer = (
  {
    drawerWidth,
    mobileOpen,
    handleDrawerToggle
  } : { 
    drawerWidth: number,
    mobileOpen: boolean,
    handleDrawerToggle: () => any
  }
) => {
  const router = useRouter()
  const { pathname } = router

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: '16px 32px' }}>
      <StyledToolbar>
        <Box
          component='div'
          sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
          <Link href='/'>
            <a>
              <Image src={logo} alt="logo" width="126" height="30" />
            </a>
          </Link>
        </Box>
      </StyledToolbar>
      <List>
        {[
          { label: 'Dashboard', icon: <BsGrid /> },
          { label: 'My RFPs', icon: <GiOfficeChair />, href: '/' },
          { label: 'Templates', icon: <FaEnvelopeOpenText /> },
          { label: 'Proposals', icon: <BiPackage /> }
        ].map(({ icon, label, href }, index) => (
          <Link href={href || '/'}>
            <ListItem key={label} disablePadding>
              <StyledListItemButton active={href === pathname} disableRipple>
                <StyledListItemIcon>
                  {icon}
                </StyledListItemIcon>
                <StyledListItemText primary={label} />
              </StyledListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {[
          { label: 'Responses', icon: <TiArrowSync /> },
          { label: 'Products & Services', icon: <BiPackage /> },
          { label: 'Dashboard', icon: <BsGrid /> }
        ].map(({ icon, label, href }, index) => (
          <Link href={href || '/'}>
            <ListItem key={label} disablePadding>
              <StyledListItemButton active={href === pathname} disableRipple>
                <StyledListItemIcon>
                  {icon}
                </StyledListItemIcon>
                <StyledListItemText primary={label} />
              </StyledListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Box sx={{ display: 'flex', flexGrow: 1 }} />
      <Divider />
      <List sx={{ display: 'flex', flexGrow: 0 }}>
        {['Settings'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <StyledListItemButton disableRipple>
              <StyledListItemIcon>
                <MdSettings />
              </StyledListItemIcon>
              <StyledListItemText primary={text} />
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const container = typeof window !== "undefined" ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="app nav"
    >
      <MuiDrawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </MuiDrawer>
      <MuiDrawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </MuiDrawer>
    </Box>
  )
}

export default Drawer;