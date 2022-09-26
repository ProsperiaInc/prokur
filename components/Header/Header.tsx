import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { MdMenu } from 'react-icons/md'
import styled from '@emotion/styled';
import logo from 'assets/images/prokur-logo.png';
import Image from 'next/image';
import { User } from 'services/types';
import Link from 'next/link';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const StyledAppBar = styled(AppBar)(({ theme }: { theme?: any }) => `
  background-color: white;
  box-shadow: none;
  border-bottom: 1px solid ${theme.custom.borderColor};
  padding: 12px;
`)

type IHeader = {
  drawerWidth: number,
  withLogo: boolean,
  handleDrawerToggle: () => any,
  onLogout: () => any,
  user: User | null
}

const Header = ({ drawerWidth, handleDrawerToggle, withLogo, user, onLogout }: IHeader) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = (index: number) => {
    if(settings[index] === 'Logout') onLogout()
    setAnchorElUser(null)
  };

  return (
    <StyledAppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MdMenu color='#333' />
        </IconButton>
        <Box
          sx={{
            mr: 2,
            display: { xs: 'flex', sm: 'none' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            width: '126px'
          }}
        >
          <Link href='/'>
            <a>
              <Image src={logo} alt="logo" />
            </a>
          </Link>
        </Box>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            mr: 2,
            display: { xs: 'none', sm: 'flex' },
            fontWeight: 700,
            color: '#333',
            textDecoration: 'none',
            width: '160px'
          }}
        >
          {withLogo && (
            <Link href='/'>
              <a style={{ display: 'flex', alignItems: 'center' }}>
                <Image src={logo} alt="logo" />
              </a>
            </Link>
          )}
          {!withLogo && ''}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {user && (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.first_name + ' ' + user?.last_name} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(index)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;