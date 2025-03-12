// import * as React from 'react';
// import PropTypes from 'prop-types';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import { ListItem } from '@mui/material';
// import Toolbar from '@mui/material/Toolbar';
// import { useRouter } from 'next/router';
// import Button from '@mui/material/Button';
// import { Menu } from '@mui/icons-material';
// import ListAltIcon from '@mui/icons-material/ListAlt';
// import InventoryIcon from '@mui/icons-material/Inventory';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import { AccountCircle } from '@mui/icons-material';
// import { Settings } from '@mui/icons-material';
// import RoomIcon from '@mui/icons-material/Room';
// import SettingsIcon from '@mui/icons-material/Settings';
// import ContactPhoneIcon from '@mui/icons-material/ContactPhone';


// // const drawerWidthExpanded = 240; // Full width
// // const drawerWidthisOpend = 80;  // isOpend width

// // function ResponsiveDrawer(props) {
// //   const { window } = props;
// // //   const [mobileOpen, setMobileOpen] = React.useState(false);
// //   const [isOpend, setisOpend] = React.useState(false); // New state for isOpend drawer

// //   const router = useRouter();

// //   const clickSiteLink = (routing_link) => {
// //     const str_strip = routing_link.replaceAll(' ', '');
// //     const routing_str = str_strip.toLowerCase();
// //     router.push(`/${routing_str}`);
// //   };

// // //   const handleDrawerToggle = () => {
// // //     setMobileOpen(!mobileOpen);
// // //   };

// //   const handleisOpenToggle = () => {
// //     setisOpend(!isOpend); // Toggle isOpen state
// //   };

// //   const profile_pic = (
// //     <div>
// //       <Box display="flex" justifyContent="center" alignItems="center">
// //         <img src="/Inventory-logos_black-cropped.svg" alt="logo" width="50" height="50" />
// //       </Box>
// //     </div>
// //   );

// //   const app = (
// //     <div>
//     //   <Box>
//     //     <Divider>App</Divider>
//     //     <List>
//     //       <ListItemButton onClick={() => { clickSiteLink("Orders"); }}>
//     //         <ListItemIcon>
//     //           <ListAltIcon />
//     //         </ListItemIcon>
//     //         {!isOpend && <ListItemText primary={"Orders"} sx={{ pl: 2 }} />}
//     //       </ListItemButton>
//     //       <ListItemButton onClick={() => { clickSiteLink("Inventory"); }}>
//     //         <ListItemIcon>
//     //           <InventoryIcon />
//     //         </ListItemIcon>
//     //         {!isOpend && <ListItemText primary={"Inventory"} sx={{ pl: 2 }} />}
//     //       </ListItemButton>
//     //       <ListItemButton onClick={() => { clickSiteLink("Profile"); }}>
//     //         <ListItemIcon>
//     //           <AccountBoxIcon />
//     //         </ListItemIcon>
//     //         {!isOpend && <ListItemText primary={"Profile"} sx={{ pl: 2 }} />}
//     //       </ListItemButton>
//     //       <ListItemButton onClick={() => { clickSiteLink("Tracking Status"); }}>
//     //         <ListItemIcon>
//     //           <RoomIcon />
//     //         </ListItemIcon>
//     //         {!isOpend && <ListItemText primary={"Tracking Status"} sx={{ pl: 2 }} />}
//     //       </ListItemButton>
//     //     </List>
//     //   </Box>
// //     </div>
// //   );

// //   const settings = (
// //     <div>
// //       <Box>
// //         <Divider>Settings</Divider>
// //         <List>
// //           <ListItemButton onClick={() => { clickSiteLink("Settings"); }}>
// //             <ListItemIcon>
// //               <SettingsIcon />
// //             </ListItemIcon>
// //             {!isOpend && <ListItemText primary={"Settings"} sx={{ pl: 2 }} />}
// //           </ListItemButton>
// //           <ListItemButton onClick={() => { clickSiteLink("Contact Us"); }}>
// //             <ListItemIcon>
// //               <ContactPhoneIcon />
// //             </ListItemIcon>
// //             {!isOpend && <ListItemText primary={"Contact Us"} sx={{ pl: 2 }} />}
// //           </ListItemButton>
// //         </List>
// //       </Box>
// //     </div>
// //   );

// //   const container = window !== undefined ? () => window().document.body : undefined;

// //   return (
// //     <Box sx={{ display: 'flex' }}>
// //       <CssBaseline />
// //       <AppBar position="fixed" style={{ backgroundColor: '#2ec0ff' }}>
// //         <Toolbar>
// //           <IconButton
// //             color="inherit"
// //             aria-label="open drawer"
// //             edge="start"
// //             onClick={handleisOpenToggle}
// //             sx={{ mr: 2 }}
// //           >
// //             <Menu sx={{ color: '#013247' }} />
// //           </IconButton>
// //           {/* <Button color="inherit" onClick={handleisOpenToggle}>
// //             {isOpend ? 'Expand' : 'isOpen'}
// //           </Button> */}
// //         </Toolbar>
// //       </AppBar>
// //       <Box
// //         component="nav"
// //         sx={{ width: { sm: isOpend ? drawerWidthisOpend : drawerWidthExpanded }, flexShrink: { sm: 0 } }}
// //         aria-label="mailbox folders"
// //       >
// //         <Drawer
// //           container={container}
// //           variant="temporary"
// //           open={isOpend}
// //           onClose={handleisOpenToggle}
// //           ModalProps={{
// //             keepMounted: true, // Better open performance on mobile.
// //           }}
// //           sx={{
// //             display: { xs: 'block', sm: 'block' },
// //             '& .MuiDrawer-paper': {
// //               boxSizing: 'border-box',
// //               width: isOpend ? drawerWidthisOpend : drawerWidthExpanded,
// //               backgroundColor: '#2ec0ff'
// //             },
// //           }}
// //         >
// //           {profile_pic}
// //           {app}
// //           {settings}
// //         </Drawer>
// //       </Box>
// //     </Box>
// //   );
// // }

// // ResponsiveDrawer.propTypes = {
// //   window: PropTypes.func,
// // };

// // export default ResponsiveDrawer;

// // components/Sidebar.js
// // components/Sidebar.js

// import { useState } from 'react';
// // import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Divider, Box, ListItemButton, ListAltIcon, InventoryIcon, AccountBoxIcon, RoomIcon  } from '@mui/material';
// // import { Home, Settings, AccountCircle, Menu } from '@mui/icons-material';
// import { styled } from '@mui/system';
// import { useContext } from 'react';
// import { useAuth } from '../../context/AuthContext';

// const Sidebar = () => {
//     const router = useRouter();

//   const [isOpen, setIsOpen] = useState(true);

//   // Toggle sidebar open/close
//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const clickSiteLink = (routing_link) => {
//     const str_strip = routing_link.replaceAll(' ', '');
//     const routing_str = str_strip.toLowerCase();
//     router.push(`/${routing_str}`);
//   };

//   // Styled component for drawer
//   const DrawerStyled = styled(Drawer)(({ theme, open }) => ({
//     width: open ? 240 : 60,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     ...(open && {
//       width: 240,
//     }),
//     ...(!open && {
//       width: 60,
//     }),
//     position: 'relative',
//   }));

//   // Styled component for menu tab
//   const MenuTab = styled('div')(({ theme, open }) => ({
//     position: 'absolute',
//     top: "50vh", // Adjust to position it vertically as needed
//     right: open ? -15 : -15, // Position the button outside the drawer
//     width: 30,
//     height: 30,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: theme.palette.background.paper,
//     borderRadius: '50%',
//     boxShadow: theme.shadows[3],
//     cursor: 'pointer',
//     zIndex: 5,
//   }));

//   const { logout } = useAuth();


//   const handleLogout = () =>{
//     logout();
//     router.push("/");
//   }

//   return (
//     <DrawerStyled variant="permanent" open={isOpen}>
//       {/* Side tab with Menu icon */}
//       <MenuTab open={isOpen}>
//         <IconButton onClick={toggleSidebar} size="small">
//           <Menu />
//         </IconButton>
//       </MenuTab>
      
//       <Divider />
//       {/* Sidebar Items */}
//       <List>
//         <ListItem button>
//           <ListItemIcon>
//             <InventoryIcon />
//           </ListItemIcon>
//           {isOpen && <ListItemText primary="Home" />}
//         </ListItem>
//         <ListItem button>
//           <ListItemIcon>
//             <AccountCircle />
//           </ListItemIcon>
//           {isOpen && <ListItemText primary="Profile" />}
//         </ListItem>
//         <ListItem button>
//           <ListItemIcon>
//             <Settings />
//           </ListItemIcon>
//           {isOpen && <ListItemText primary="Settings" />}
//         </ListItem>
//       </List>
//       <Box>
//         <Divider>App</Divider>
//         <List>
//           <ListItemButton onClick={() => { clickSiteLink("Orders"); }}>
//             <ListItemIcon>
//               <ListAltIcon />
//             </ListItemIcon>
//             {isOpen && <ListItemText primary={"Orders"} sx={{ pl: 2 }} />}
//           </ListItemButton>
//           <ListItemButton onClick={() => { clickSiteLink("Inventory"); }}>
//             <ListItemIcon>
//               <InventoryIcon />
//             </ListItemIcon>
//             {isOpen && <ListItemText primary={"Inventory"} sx={{ pl: 2 }} />}
//           </ListItemButton>
//           <ListItemButton onClick={() => { clickSiteLink("Profile"); }}>
//             <ListItemIcon>
//               <AccountBoxIcon />
//             </ListItemIcon>
//             {isOpen && <ListItemText primary={"Profile"} sx={{ pl: 2 }} />}
//           </ListItemButton>
//           <ListItemButton onClick={() => { clickSiteLink("Tracking Status"); }}>
//             <ListItemIcon>
//               <RoomIcon />
//             </ListItemIcon>
//             {isOpen && <ListItemText primary={"Tracking Status"} sx={{ pl: 2 }} />}
//           </ListItemButton>
//           <ListItemButton onClick={handleLogout}>
//             <ListItemIcon>
//                 <RoomIcon />
//             </ListItemIcon>
//             {isOpen && <ListItemText primary={"Logout"} sx={{ pl: 2 }} />}
//             </ListItemButton>
//         </List>
//       </Box>
//     </DrawerStyled>
//   );
// };

// export default Sidebar;
