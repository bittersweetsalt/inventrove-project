import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ProfilePic from '../../profile';
import { SvgIcon } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const router = useRouter();

  // const handleDrawerClose = () => {
  //   setIsClosing(true);
  //   setMobileOpen(false);
  // };

  // const handleDrawerTransitionEnd = () => {
  //   setIsClosing(false);
  // };

  // const handleDrawerToggle = () => {
  //   if (!isClosing) {
  //     setMobileOpen(!mobileOpen);
  //   }
  // };

  const clickSiteLink = (routing_link) => {
    const routing_str = routing_link.replaceAll(' ','');
    router.push(`/${routing_str}`);
  };

  const drawer = (
    <div>
        {/* Need to change to image logo */}
        {/* <Toolbar />  */}
        <Box  
            display="flex"
            justifyContent="center"
            alignItems="center"
        > 
            <img src="/Inventory-logos_black-cropped.svg" alt="logo" width="100" height="100" />
        </Box>
        <ProfilePic></ProfilePic>
        <Divider>App</Divider>
        <List>
            {["Orders", "Inventory", "Profile", "Tracking Status"].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton 
                  onClick={() => {
                    clickSiteLink(text);
                  }}>
                  <ListItemText primary={text} sx={{pl: 4}}/>                
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        <Divider>Settings</Divider>
        <List>
            {["Settings", "Contact Us"].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    clickSiteLink(text);
                  }}>
                    <ListItemText primary={text} sx={{pl: 4}}/>
                </ListItemButton>
            </ListItem>
            ))}
        </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          // ml: { sm: `${drawerWidth}px` },
          width: { sm: `15%` },
          ml: { sm: `15%` },
        }}
      >
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: `15%` }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: `15%` },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;