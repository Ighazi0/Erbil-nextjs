import React, { useState, useRef, useEffect } from "react";
import { 
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Box,
    Divider
} from "@mui/material";
import { 
    AccountCircle,
    Settings,
    Logout,
    Dashboard
} from '@mui/icons-material';
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Logout as LogoutService } from "@/services/authService";
import { FormattedMessage, useIntl } from "react-intl";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter();
    const intl = useIntl();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await LogoutService();
            // Delete session
            await fetch('/api/auth/session', { method: 'DELETE' });
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <FormattedMessage id="admin_dashboard" defaultMessage="Admin Dashboard" />
                </Typography>

                {user && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ mr: 2 }}>
                            {user.email}
                        </Typography>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                                <AccountCircle />
                            </Avatar>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => router.push('/admin')}>
                                <ListItemIcon>
                                    <Dashboard fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>
                                    <FormattedMessage id="dashboard" defaultMessage="Dashboard" />
                                </ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => router.push('/admin/settings')}>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>
                                    <FormattedMessage id="settings" defaultMessage="Settings" />
                                </ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                                <ListItemIcon>
                                    <Logout fontSize="small" color="error" />
                                </ListItemIcon>
                                <ListItemText>
                                    <FormattedMessage id="logout" defaultMessage="Logout" />
                                </ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
