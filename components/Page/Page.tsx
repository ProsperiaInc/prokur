import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Header from 'components/Header/Header';
import Drawer from 'components/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, userLogout } from 'store/features/auth/authSlice';

const drawerWidth = 240;

export default function Page(props: any) {
  const { children, noDrawer, noLink, noPadding } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const onLogout = () => dispatch(userLogout())

  return (
    <Box sx={{ display: 'flex' }}>
      <Header
        user={user}
        withLogo={noDrawer}
        noLink={noLink}
        drawerWidth={noDrawer ? 0 : drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
        onLogout={onLogout}
      />
      {!noDrawer && <Drawer drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />}
      <Box component="main" sx={{ flexGrow: 1, p: noPadding ? 0 : { xs: 3, lg: 8 }, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
