import React, { useState } from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Home as HomeIcon,
    Settings as SettingsIcon,
    ChevronLeft as ChevronLeftIcon,
    Article as ArticleIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const SidebarNav = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const router = useRouter();
    const { logout } = useAuth();

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    // Function to handle navigation
    const clickSiteLink = (routing_link) => {
        const str_strip = routing_link.replaceAll(' ', '');
        const routing_str = str_strip.toLowerCase();
        router.push(`/${routing_str}`);
    };

    // Function to handle logout
    const handleLogout = () => {
        logout();
        router.push('/');
    };

    // Function to check if a link is active
    const isActive = (routing_link) => {
        const str_strip = routing_link.replaceAll(' ', '');
        const routing_str = str_strip.toLowerCase();
        return router.pathname === `/${routing_str}`;
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: isExpanded ? 240 : 64,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: isExpanded ? 240 : 64,
                    boxSizing: 'border-box',
                    transition: 'width 0.3s ease',
                    overflowX: 'hidden',
                },
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isExpanded ? 'flex-start' : 'center',
                    px: isExpanded ? 2 : 0,
                }}
            >
                <IconButton onClick={toggleSidebar} sx={{ mr: isExpanded ? 1 : 0 }}>
                    {isExpanded ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>
                {isExpanded && (
                    <Typography variant="h6" noWrap>
                        My App
                    </Typography>
                )}
            </Toolbar>
            <Divider />
            <List>
                {/* Orders */}
                <ListItem
                    button
                    onClick={() => clickSiteLink('Orders')}
                    sx={{
                        justifyContent: isExpanded ? 'flex-start' : 'center',
                        px: isExpanded ? 2 : 0,
                        backgroundColor: isActive('Orders') ? 'rgba(0, 0, 0, 0.08)' : 'inherit', // Highlight if active
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.08)', // Hover effect
                        },
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: isExpanded ? 56 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        <ArticleIcon />
                    </ListItemIcon>
                    {isExpanded && <ListItemText primary="Orders" />}
                </ListItem>

                {/* Inventory */}
                <ListItem
                    button
                    onClick={() => clickSiteLink('Inventory')}
                    sx={{
                        justifyContent: isExpanded ? 'flex-start' : 'center',
                        px: isExpanded ? 2 : 0,
                        backgroundColor: isActive('Inventory') ? 'rgba(0, 0, 0, 0.08)' : 'inherit', // Highlight if active
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.08)', // Hover effect
                        },
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: isExpanded ? 56 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        <HomeIcon />
                    </ListItemIcon>
                    {isExpanded && <ListItemText primary="Inventory" />}
                </ListItem>

                {/* Tracking Status */}
                <ListItem
                    button
                    onClick={() => clickSiteLink('Tracking Status')}
                    sx={{
                        justifyContent: isExpanded ? 'flex-start' : 'center',
                        px: isExpanded ? 2 : 0,
                        backgroundColor: isActive('Tracking Status') ? 'rgba(0, 0, 0, 0.08)' : 'inherit', // Highlight if active
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.08)', // Hover effect
                        },
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: isExpanded ? 56 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        <HomeIcon />
                    </ListItemIcon>
                    {isExpanded && <ListItemText primary="Tracking Status" />}
                </ListItem>
            </List>
            <Divider>App</Divider>
            <List>
                {/* Profile */}
                <ListItem
                    button
                    onClick={() => clickSiteLink('Profile')}
                    sx={{
                        justifyContent: isExpanded ? 'flex-start' : 'center',
                        px: isExpanded ? 2 : 0,
                        backgroundColor: isActive('Profile') ? 'rgba(0, 0, 0, 0.08)' : 'inherit', // Highlight if active
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.08)', // Hover effect
                        },
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: isExpanded ? 56 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        <HomeIcon />
                    </ListItemIcon>
                    {isExpanded && <ListItemText primary="Profile" />}
                </ListItem>

                {/* Settings */}
                <ListItem
                    button
                    onClick={() => clickSiteLink('Settings')}
                    sx={{
                        justifyContent: isExpanded ? 'flex-start' : 'center',
                        px: isExpanded ? 2 : 0,
                        backgroundColor: isActive('Settings') ? 'rgba(0, 0, 0, 0.08)' : 'inherit', // Highlight if active
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.08)', // Hover effect
                        },
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: isExpanded ? 56 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        <SettingsIcon />
                    </ListItemIcon>
                    {isExpanded && <ListItemText primary="Settings" />}
                </ListItem>

                {/* Logout */}
                <ListItem
                    button
                    onClick={handleLogout}
                    sx={{
                        justifyContent: isExpanded ? 'flex-start' : 'center',
                        px: isExpanded ? 2 : 0,
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.08)', // Hover effect
                        },
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: isExpanded ? 56 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        <HomeIcon />
                    </ListItemIcon>
                    {isExpanded && <ListItemText primary="Logout" />}
                </ListItem>
            </List>
        </Drawer>
    );
};

export default SidebarNav;